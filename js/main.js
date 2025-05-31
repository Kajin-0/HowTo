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
          <strong>${item.title}</strong><br/>
          <span class="badge badge-blue">${item.type}</span>
          ${item.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join(' ')}<br/>
          <a href="guide.html?id=${item.id}">View Guide</a>
          <button class="copy-btn" data-id="${item.id}">📋 Copy ID</button>
        `;
        resultsEl.appendChild(li);
      });

      // Copy button logic
      document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = () => {
          navigator.clipboard.writeText(btn.getAttribute('data-id'));
          btn.textContent = '✔ Copied';
          setTimeout(() => btn.textContent = '📋 Copy ID', 2000);
        };
      });
    });
  });