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
        const item = r.item;
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${item.title}</strong><br/>
          <span class="badge badge-blue">${item.type.replace('_', ' ')}</span>
          ${item.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join(' ')}<br/>
          <a href="guide.html?id=${item.id}">View Guide</a>
        `;
        resultsEl.appendChild(li);
      });
    });
  });