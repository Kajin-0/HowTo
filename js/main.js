fetch('data/guides.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, {
      keys: ['title', 'tags'],
      threshold: 0.4,
      includeMatches: true
    });

    const input = document.getElementById('search');
    const resultsEl = document.getElementById('results');

    const getHighlightedText = (text, matches) => {
      if (!matches || matches.length === 0) return text;
      let result = '';
      let lastIdx = 0;

      matches.forEach(match => {
        const indices = match.indices;
        indices.forEach(([start, end]) => {
          result += text.slice(lastIdx, start);
          result += '<mark>' + text.slice(start, end + 1) + '</mark>';
          lastIdx = end + 1;
        });
      });

      result += text.slice(lastIdx);
      return result;
    };

    input.addEventListener('input', () => {
      const query = input.value.trim();
      const results = query ? fuse.search(query) : [];

      resultsEl.innerHTML = '';
      if (query && results.length === 0) {
        resultsEl.innerHTML = "<li style='color:gray'>No results. Try simpler keywords like <em>repair</em>, <em>egg</em>, or <em>semiconductor</em>.</li>";
        return;
      }

      results.slice(0, 10).forEach(r => {
        const item = r.item;
        const titleMatch = r.matches.find(m => m.key === 'title');
        const tagMatches = r.matches.filter(m => m.key === 'tags');

        const highlightedTitle = getHighlightedText(item.title, titleMatch ? [titleMatch] : []);
        const highlightedTags = item.tags.map(tag => {
          const match = tagMatches.find(m => m.value === tag);
          return `<span class="badge badge-gray">${getHighlightedText(tag, match ? [match] : [])}</span>`;
        }).join(' ');

        const li = document.createElement('li');
        li.innerHTML = `
          <a class="guide-card" href="guide.html?id=${item.id}">
            <div class="guide-title">${highlightedTitle}</div>
            <div class="guide-meta">
              <span class="badge badge-blue">${item.type}</span>
              ${highlightedTags}
            </div>
          </a>
        `;
        resultsEl.appendChild(li);
      });
    });
  })
  .catch(err => {
    console.error("Error loading guides.json:", err);
    document.getElementById('results').innerHTML = "<li style='color:red'>Failed to load guide list.</li>";
  });
