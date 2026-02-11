function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Proje kökünü: assets/js/blog.js -> ../../ = proje root
function getSiteRoot() {
  const script = document.currentScript;
  if (!script || !script.src) return null;

  // assets/js/blog.js -> proje root
  return new URL('../../', script.src);
}

function u(root, path) {
  // root + "aromaterapi/serumlar/index.html" gibi
  return new URL(path, root).href;
}

/* === Navbar (URL'e göre) === */
function renderNav() {
  const cat = (getParam('cat') || '').toLowerCase();
  const el = document.getElementById('dynamicNav');
  if (!el) return;

  const root = getSiteRoot();
  if (!root) return;

  let items = [
    { text: 'Blog', href: u(root, 'blog/index.html'), key: 'blog' },
    { text: 'Serumlar', href: u(root, 'aromaterapi/serumlar/index.html'), key: 'serumlar' },
    { text: 'Sabit Yağlar', href: u(root, 'aromaterapi/sabit-yaglar/index.html'), key: 'sabit-yaglar' },
    { text: 'Uçucu Yağlar', href: u(root, 'aromaterapi/ucucu-yaglar/index.html'), key: 'ucucu-yaglar' },
  ];
  let activeKey = 'blog';

  if (cat === 'vitamin-mineral') {
    items = [
      { text: 'Blog', href: u(root, 'blog/index.html?cat=vitamin-mineral'), key: 'blog' },
      { text: 'Vitaminler', href: u(root, 'vitamin-mineral/vitamin/index.html'), key: 'vitaminler' },
      { text: 'Mineraller', href: u(root, 'vitamin-mineral/mineral/index.html'), key: 'mineraller' },
    ];
    activeKey = 'blog';
  }

  if (cat === 'dermokozmetik') {
    items = [
      { text: 'Blog', href: u(root, 'blog/index.html?cat=dermokozmetik'), key: 'blog' },
      { text: 'Dermokozmetik', href: u(root, 'dermokozmetik/index.html'), key: 'dermokozmetik' },
    ];
    activeKey = 'blog';
  }

  el.innerHTML = items.map(i => {
    const isActive = (i.key === activeKey);
    return `
      <li class="nav-item">
        <a class="nav-link ${isActive ? 'active' : ''}" href="${i.href}">${i.text}</a>
      </li>
    `;
  }).join('');
}

/* === Başlat === */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
});
