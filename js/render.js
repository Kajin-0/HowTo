const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  document.getElementById('guide-container').innerHTML = '<p style="color:red">Missing guide ID.</p>';
} else {
  fetch(`data/guides/${id}.json`)
    .then(res => {
      if (!res.ok) throw new Error('Guide not found');
      return res.json();
    })
    .then(data => {
      const container = document.getElementById('guide-container');
      const toolsHTML = '<ul class="tools-list">' + data.tools.map(tool => `<li>${tool}</li>`).join('') + '</ul>';
      const stepsHTML = '<ol>' + data.steps.map(step => `<li>${step}</li>`).join('') + '</ol>';
      const tagsHTML = data.tags.map(tag => `<span class="badge badge-gray">${tag}</span>`).join(' ');

      container.innerHTML = `
        <h1>${data.title}</h1>
        <div class="meta">
          <span class="badge badge-blue">${data.type}</span> 
          <span class="badge badge-green">${data.difficulty}</span> 
          <span class="badge badge-gray">${data.time_minutes} min</span>
        </div>
        <hr/>
        <h2>Tools Required</h2>
        ${toolsHTML}
        <hr/>
        <h2>Steps</h2>
        ${stepsHTML}
        <hr/>
        <h2>Tags</h2>
        <div class="tags">${tagsHTML}</div>
      `;

      highlightMetrics(container);
    })
    .catch(err => {
      document.getElementById('guide-container').innerHTML = '<p style="color:red">Error loading guide: ' + err.message + '</p>';
    });
}

function highlightMetrics(container) {
  const regex = /\b(\d+(\.\d+)?(\s?-\s?\d+(\.\d+)?)?(\s*[/]?\s*)?(ms|s|sec|seconds?|min|minutes?|hr|hours?|°C|°F|K|nm|mm|cm|m|µm|um|angstrom|Å|kg|g|mg|µg|ug|mL|ml|L|Hz|kHz|MHz|GHz|Ω|Ohm|V|mV|A|mA|W|kW|N|Nm|psi|%|in|ft|°))\b/gi;
  container.querySelectorAll("ol li, .tools-list li").forEach(el => {
    el.innerHTML = el.innerHTML.replace(regex, '<span class="metric">$&</span>');
  });
}
