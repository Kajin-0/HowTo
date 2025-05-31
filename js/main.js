fetch('data/guides.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, { keys: ['title', 'tags'] });
    const input = document.getElementById('search');
    const resultsEl = document.getElementById('results');
    input.addEventListener('input', () => {
      const result = fuse.search(input.value);
      resultsEl.innerHTML = '';
      result.slice(0, 10).forEach(r => {
        const item = r.item;
        const li = document.createElement('li');
        li.innerHTML = `
          <a class="guide-card" href="guide.html?id=${item.id}">
            <div class="guide-title">${item.title}</div>
            <div class="guide-meta">
              <span class="badge badge-blue">${item.type}</span>
              ${item.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join(' ')}
            </div>
          </a>
        `;
        resultsEl.appendChild(li);
      });
    });
  });