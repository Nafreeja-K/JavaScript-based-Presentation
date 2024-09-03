document.addEventListener('DOMContentLoaded', () => {
  const slides = [
    { type: 'opening', content: '<h2 class="centering">Welcome to the Presentation</h2><p class="content-centering">This is the opening slide.</p>' },
    { type: 'image', content: '<h2 class="centering">Image Slide</h2><img src="https://media.istockphoto.com/id/1139184228/photo/sheet-metal-in-arrow-infinity-recycling-symbol-3d-illustration.jpg?s=1024x1024&w=is&k=20&c=wUqBsGHtzF3EFSbYEADmI5_NpN7Y7dpkm8pH7suSPWQ=" alt="Logo"]  class="content-centering">' },
    { type: 'chart', content: '<h2>Chart Slide</h2><canvas id="chartCanvas"></canvas>' },
    { type: 'code', content: '<h2 class="centering">Code Block</h2><pre><code class="content-centering">console.log("Hello, World!");</code></pre>' },
    { type: 'python', content: `<h2 class="centering">Python Code</h2><textarea id="python-code" class="content-centering"></textarea><button id="run-code" class="button-centering">Run Code</button><div id="python-output"></div>` },
    { type: 'closing', content: '<h1 class="thankYou">Thank You!</h1><p  class="content-centering">This is the closing slide.</p>' }
  ];

  let currentSlide = 0;
  const slideContainer = document.getElementById('slides');
  loadSlide(currentSlide);

  document.getElementById('prev-slide').addEventListener('click', () => {
    if (currentSlide > 0) currentSlide--;
    loadSlide(currentSlide);
  });

  document.getElementById('next-slide').addEventListener('click', () => {
    if (currentSlide < slides.length - 1) currentSlide++;
    loadSlide(currentSlide);
  });

  function loadSlide(index) {
    slideContainer.innerHTML = slides[index].content;
    
    if (slides[index].type === 'chart') {
      loadChart();
    }

    if (slides[index].type === 'python') {
      const runButton = document.getElementById('run-code');
      const outputDiv = document.getElementById('python-output');
      runButton.addEventListener('click', async () => {
        const code = document.getElementById('python-code').value;
        const result = await runPythonCode(code);
        outputDiv.innerHTML = `Output: ${result.output || ''}<br>Error: ${result.error || ''}`;
      });
    }
  }

  async function runPythonCode(code) {
    const response = await fetch('/run-python', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    return await response.json();
  }

  

  // Toggle dark mode
  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});

//function to get the chart displayed
function loadChart() {
  const ctx = document.getElementById('chartCanvas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Green'],
      datasets: [{
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'green']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
