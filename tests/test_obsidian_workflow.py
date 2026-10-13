import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from urllib.parse import unquote, urljoin
from unittest.mock import patch

from PIL import Image
import pillow_avif

spec = importlib.util.spec_from_file_location('blog', Path(__file__).parents[1] / 'docs/blog.py')
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)


class ObsidianWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / '_config.yml').write_text('baseurl: ""\n', encoding='utf-8')
        self.originals = self.root / '_media/originals'
        self.originals.mkdir(parents=True)

    def post(self, body, lang='kr'):
        path = w.new_post('sample', '샘플 글', lang=lang, root=self.root)
        path.write_text(path.read_text(encoding='utf-8') + body, encoding='utf-8')
        return path

    def image(self, name='pasted image.png', mode='RGB', size=(500, 320)):
        path = self.originals / name
        im = Image.new(mode, size, (30, 90, 160, 120) if mode == 'RGBA' else (30, 90, 160))
        im.save(path)
        return path

    def test_photo_avif_resize_source_preservation_and_idempotence(self):
        source = self.image('photo.jpg', size=(2100, 1700))
        before = source.read_bytes()
        post = self.post('![사진](../_media/originals/photo.jpg)\n')
        results = w.optimize_posts([post], self.root)
        self.assertEqual(results[0]['format'], 'avif')
        target = next((self.root / 'assets/images/posts').glob('*.avif'))
        with Image.open(target) as im:
            self.assertEqual(im.size, (1600, 1295))
        self.assertEqual(source.read_bytes(), before)
        text = post.read_bytes()
        with patch.object(w.Media, 'optimize', wraps=w.Media(self.root).optimize) as optimize:
            self.assertEqual(w.optimize_posts([post], self.root), [])
        self.assertEqual(post.read_bytes(), text)
        self.assertTrue(list((self.root / '.blog-workflow/obsidian-backups').rglob('sample.md')))

    def test_transparency_and_lossless_pixels(self):
        source = self.image(mode='RGBA')
        post = self.post('![화면](../_media/originals/pasted%20image.png "caption")\n')
        w.optimize_posts([post], self.root)
        target = next((self.root / 'assets/images/posts').iterdir())
        with Image.open(source) as left, Image.open(target) as right:
            self.assertEqual(left.convert('RGBA').tobytes(), right.convert('RGBA').tobytes())
        self.assertIn('"caption"', post.read_text(encoding='utf-8'))

    def test_animation_bytes_are_preserved(self):
        source = self.originals / 'animation.gif'
        one = Image.new('RGB', (20, 20), 'red')
        two = Image.new('RGB', (20, 20), 'blue')
        one.save(source, save_all=True, append_images=[two], duration=120, loop=0)
        post = self.post('![](../_media/originals/animation.gif)\n')
        w.optimize_posts([post], self.root)
        output = next((self.root / 'assets/images/posts').iterdir())
        self.assertEqual(output.read_bytes(), source.read_bytes())
        with Image.open(output) as image:
            self.assertEqual(image.n_frames, 2)

    def test_existing_avif_is_not_reencoded(self):
        source = self.originals / 'already.avif'
        Image.new('RGB', (120, 100), 'navy').save(source, quality=50)
        post = self.post('![](../_media/originals/already.avif)\n')
        w.optimize_posts([post], self.root)
        output = next((self.root / 'assets/images/posts').iterdir())
        self.assertEqual(output.read_bytes(), source.read_bytes())

    def test_code_examples_external_urls_and_frontmatter_stay_unchanged(self):
        self.image('input.png')
        literal = '![](../_media/originals/input.png)'
        body = '```md\n' + literal + '\n```\n\n`' + literal + '` ' + literal + '\n\n![outside](https://example.com/a.png)\n'
        post = self.post(body)
        header = w.split_post(post.read_text(encoding='utf-8'))[1]
        w.optimize_posts([post], self.root)
        result = post.read_text(encoding='utf-8')
        self.assertEqual(w.split_post(result)[1], header)
        self.assertEqual(result.count(literal), 2)
        self.assertIn('https://example.com/a.png', result)

    def test_list_blockquote_and_filename_parentheses(self):
        self.image('input (1).png')
        body = '> caption\n> ![alt](<../_media/originals/input (1).png>)\n\n- item\n  ![](../_media/originals/input%20%281%29.png)\n'
        post = self.post(body)
        w.optimize_posts([post], self.root)
        result = post.read_text(encoding='utf-8')
        self.assertNotIn('_media/originals', result)
        self.assertIn('> ![alt](../assets/', result)
        self.assertIn('  ![](../assets/', result)

    def test_missing_image_fails_before_changing_posts(self):
        self.image('first.png')
        post = self.post('![](../_media/originals/first.png)\n![](../_media/originals/missing.png)\n')
        before = post.read_bytes()
        with self.assertRaisesRegex(ValueError, '찾을 수'):
            w.optimize_posts([post], self.root)
        self.assertEqual(post.read_bytes(), before)
        self.assertFalse((self.root / 'assets/images/posts').exists())

    def test_ready_links_work_in_obsidian_and_korean_site(self):
        self.image('test.png')
        post = self.post('![](../_media/originals/test.png)\n')
        ready = w.ready_post(post, self.root)
        self.assertFalse(post.exists())
        fm, _, body = w.split_post(ready.read_text(encoding='utf-8'))
        href = w.image_links(body)[0][2]
        local = (ready.parent / unquote(href)).resolve()
        self.assertTrue(local.is_file())
        self.assertEqual(urljoin('https://swlee.md' + fm['permalink'], href), 'https://swlee.md/' + local.relative_to(self.root).as_posix())
        self.assertTrue(fm['published'])

    def test_ready_english_links_and_collision_guard(self):
        self.image('test.png')
        post = self.post('![](../_media/originals/test.png)\n', lang='en')
        target = w.ready_post(post, self.root)
        fm, _, body = w.split_post(target.read_text(encoding='utf-8'))
        href = w.image_links(body)[0][2]
        self.assertTrue(urljoin('https://swlee.md' + fm['permalink'], href).startswith('https://swlee.md/assets/'))
        self.post('another body', lang='en')
        before = target.read_bytes()
        with self.assertRaisesRegex(ValueError, '이미 있습니다'):
            w.ready_post(post, self.root)
        self.assertEqual(target.read_bytes(), before)

    def test_source_symlink_outside_originals_is_not_read(self):
        # Resolution itself enforces the boundary without requiring symlink privileges.
        outside = self.root / 'private.png'
        outside.write_bytes(b'not an image')
        self.assertIsNone(w.Media(self.root).optimize(outside.resolve()))


if __name__ == '__main__':
    unittest.main()
