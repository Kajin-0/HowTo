const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch(`data/guides/${id}.json`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('guide-container');
    const toolsHTML = `<ul class="tools-list">${data.tools.map(tool => `<li>${tool}</li>`).join('')}</ul>`;
    container.innerHTML = `
      <h1>${data.title}</h1>
      <p>
        <span class="badge badge-blue">${data.type}</span> 
        <span class="badge badge-green">${data.difficulty}</span> 
        <span class="badge badge-gray">${data.time_minutes} min</span>
      </p>
      <p><strong>Tools Required:</strong></p>
      ${toolsHTML}
      <ol>${data.steps.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
  });