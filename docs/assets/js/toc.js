// Table of contents for long posts. Opt in per post with `toc: true` in
// front matter; the layout then renders an empty, hidden <details data-toc>.
// This script fills it from the post's h2/h3 headings and reveals it only
// when there are enough sections to be worth navigating.
(function () {
  var MIN_HEADINGS = 3;

  function slugify(text, used) {
    var base = text.trim().toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-') || 'section';
    var slug = base;
    var n = 1;
    while (used[slug] || document.getElementById(slug)) { slug = base + '-' + n++; }
    used[slug] = true;
    return slug;
  }

  function buildLink(heading) {
    var a = document.createElement('a');
    a.href = '#' + encodeURIComponent(heading.id);
    a.textContent = heading.textContent.trim();
    return a;
  }

  function buildToc() {
    var container = document.querySelector('[data-toc]');
    var content = document.querySelector('.post-content');
    if (!container || !content) return;

    // Count h2 and h3 together: a post can be one h2 with many h3 sections.
    var headings = content.querySelectorAll('h2, h3');
    if (headings.length < MIN_HEADINGS) return;

    var used = {};
    var root = document.createElement('ol');
    var lastH2 = null;
    var currentSub = null;

    headings.forEach(function (heading) {
      if (!heading.id) heading.id = slugify(heading.textContent, used);
      var li = document.createElement('li');
      li.appendChild(buildLink(heading));

      if (heading.tagName === 'H2') {
        root.appendChild(li);
        lastH2 = li;
        currentSub = null;
      } else {
        if (!lastH2) { root.appendChild(li); return; }
        if (!currentSub) {
          currentSub = document.createElement('ol');
          lastH2.appendChild(currentSub);
        }
        currentSub.appendChild(li);
      }
    });

    container.querySelector('nav').appendChild(root);
    container.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildToc);
  } else {
    buildToc();
  }
})();
