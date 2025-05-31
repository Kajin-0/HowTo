const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch(`data/guides/${id}.json`)
  .then(res => res.json())
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
  });

// Highlight numbers, units, and metrics automatically
function highlightMetrics(container) {
  const regex = /\b(\d+(\.\d+)?)(\s?(ms|s|sec|min|hr|°C|°F|nm|mm|cm|kg|g|mg|Hz|kHz|MHz|GHz|Å|Ω|V|mA|A|kW|W|psi|%|in|ft|N|Nm))\b/g;

  container.querySelectorAll("ol li, .tools-list li").forEach(el => {
    el.innerHTML = el.innerHTML.replace(regex, '<span class="metric">$&</span>');
  });
}
