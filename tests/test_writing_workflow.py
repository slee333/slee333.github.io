"""Regression tests for publishing boundaries and Notion conversions."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock, patch
import json

spec = importlib.util.spec_from_file_location('workflow', Path(__file__).parents[1] / 'docs/new_blog_workflow.py')
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)


def text(value):
    return [{'plain_text': value}]


def block(kind, value='', children=None, **extra):
    result = {'id': 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'type': kind,
              kind: {'rich_text': text(value), **extra}}
    if children:
        result['children'] = children
    return result


def page(lang='kr'):
    return {'id': '261be74c-cd5c-805c-8d97-ff504d046545', 'properties': {
        'Name': {'type': 'title', 'title': text('샘플 원고')},
        'categories': {'select': {'name': 'learning'}},
        'lang': {'select': {'name': lang}},
        'date': {'date': {'start': '2026-09-26T10:00:00+09:00'}},
        'translation_id': {'rich_text': text('sample-post')},
    }}


class WorkflowTests(unittest.TestCase):
    def test_stages_without_writing_post_then_applies_idempotently(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            review = w.prepare(page(), [block('paragraph', 'Hello')], {}, root)
            self.assertFalse((root / '_posts').exists())
            target = w.apply_review(review, root)
            self.assertTrue(target.exists())
            self.assertEqual(w.apply_review(review, root), target)
            self.assertIn('Hello', w.review_diff(review, root) or target.read_text(encoding='utf-8'))

    def test_existing_url_preserved_and_concurrent_edit_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            target = w.apply_review(w.prepare(page(), [block('paragraph', 'First')], {}, root), root)
            fm, _ = w.read_post(target)
            fm['permalink'] = '/learning/legacy-url/'
            target.write_text(w.serialize(fm, 'Original'), encoding='utf-8')
            review = w.prepare(page(), [block('paragraph', 'Updated')], {}, root)
            _, manifest, actual, candidate = w.load_review(review, root)
            self.assertEqual(actual, target.resolve())
            self.assertEqual(manifest['permalink'], '/learning/legacy-url/')
            target.write_text('A concurrent local edit', encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'changed since import'):
                w.apply_review(review, root)
            self.assertEqual(target.read_text(encoding='utf-8'), 'A concurrent local edit')

    def test_language_prefix_and_missing_properties(self):
        fm, name = w.metadata(page('en'), {})
        self.assertEqual(fm['permalink'], '/en/learning/sample-post/')
        self.assertEqual(fm['tags'], [])
        self.assertEqual(name, '2026-09-26-sample-post.md')
        self.assertNotIn('featured', fm)

    def test_nested_lists_tables_toggle_code_and_escaping(self):
        content = [block('bulleted_list_item', 'Parent', [block('numbered_list_item', 'Child')]),
                   block('toggle', 'Details', [block('paragraph', '<script>')]),
                   block('code', language='python')]
        content[-1]['code']['rich_text'] = text('first\n') + text('second')
        content.append(block('table', children=[{'type': 'table_row', 'table_row': {'cells': [text('A'), text('B')]}}], has_column_header=True))
        result = w.render_blocks(content, None)
        self.assertIn('<li>Parent<ol>', result)
        self.assertIn('<details><summary>Details</summary>', result)
        self.assertIn('&lt;script&gt;', result)
        self.assertIn('first\nsecond', result)
        self.assertIn('<th>A</th>', result)

    def test_unsupported_content_fails_without_publishing(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            with self.assertRaisesRegex(ValueError, 'Unsupported'):
                w.prepare(page(), [block('video')], {}, root)
            self.assertFalse((root / '_posts').exists())

    def test_tampered_candidate_and_path_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            review = w.prepare(page(), [block('paragraph', 'hello')], {}, root)
            stage = root / '.blog-workflow/reviews' / review
            (stage / 'post.md').write_text('tampered', encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'Candidate changed'):
                w.apply_review(review, root)
            manifest = json.loads((stage / 'manifest.json').read_text())
            manifest['target'] = '../outside.md'
            (stage / 'manifest.json').write_text(json.dumps(manifest))
            with self.assertRaisesRegex(ValueError, 'inside _posts'):
                w.apply_review(review, root)

    def test_pagination_and_recursive_fetch(self):
        client = Mock()
        client.blocks.children.list.side_effect = [
            {'results': [{'id': 'parent', 'has_children': True}], 'has_more': True, 'next_cursor': 'next'},
            {'results': [block('paragraph', 'child')], 'has_more': False},
            {'results': [block('paragraph', 'last')], 'has_more': False}]
        result = w.get_all_blocks(client, 'page')
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['children'][0]['paragraph']['rich_text'], text('child'))
        self.assertEqual(client.blocks.children.list.call_args.kwargs['start_cursor'], 'next')

    def test_same_image_content_has_same_destination(self):
        with tempfile.TemporaryDirectory() as directory:
            response = Mock()
            response.headers = {'Content-Type': 'image/png'}
            response.iter_content.return_value = [b'same image bytes']
            context = Mock()
            context.__enter__ = Mock(return_value=response)
            context.__exit__ = Mock(return_value=False)
            with patch('requests.get', return_value=context):
                images = w.Images(Path(directory))
                first = images.store('https://example.com/image?signature=one')
                second = images.store('https://example.com/image?signature=two')
            self.assertEqual(first, second)
            self.assertEqual(len(images.assets), 1)


if __name__ == '__main__':
    unittest.main()
