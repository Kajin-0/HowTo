const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch(`data/guides/${id}.json`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('guide-container');
    container.innerHTML = `<h1>${data.title}</h1>
      <p><strong>Difficulty:</strong> ${data.difficulty}</p>
      <p><strong>Time:</strong> ${data.time_minutes} minutes</p>
      <p><strong>Tools:</strong> ${data.tools.join(', ')}</p>
      <ol>${data.steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
  });