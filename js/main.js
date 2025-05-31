fetch('data/guides.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, { keys: ['title', 'tags'] });
    const input = document.getElementById('search');
    const resultsEl = document.getElementById('results');
    input.addEventListener('input', () => {
      const result = fuse.search(input.value);
      resultsEl.innerHTML = '';
      result.slice(0, 5).forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="guide.html?id=${r.item.id}">${r.item.title}</a>`;
        resultsEl.appendChild(li);
      });
    });
  });