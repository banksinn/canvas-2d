// Initialize canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const select = document.getElementById("example-select");
const codeDisplay = document.getElementById("code-display");
const lineNumbers = document.getElementById("line-numbers");

// Set canvas size
canvas.width = 350;
canvas.height = 350;

let animationFrame;
let time = 0;
let currentExample = "geometric";

// Code examples for each option
const codeExamples = {
  geometric: `<span class="comment">// Geometric Patterns Example</span>
<span class="keyword">const</span> canvas = document.<span class="function">getElementById</span>(<span class="string">'canvas'</span>);
<span class="keyword">const</span> ctx = canvas.<span class="function">getContext</span>(<span class="string">'2d'</span>);

<span class="keyword">function</span> <span class="function">geometric</span>() {
  ctx.<span class="function">clearRect</span>(<span class="number">0</span>, <span class="number">0</span>, canvas.width, canvas.height);

  <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < <span class="number">8</span>; i++) {
    <span class="keyword">for</span> (<span class="keyword">let</span> j = <span class="number">0</span>; j < <span class="number">8</span>; j++) {
      <span class="keyword">const</span> x = i * <span class="number">40</span> + <span class="number">20</span>;
      <span class="keyword">const</span> y = j * <span class="number">40</span> + <span class="number">20</span>;

      <span class="keyword">const</span> hue = (i + j) * <span class="number">30</span>;
      ctx.fillStyle = <span class="string">\`hsl(\${hue}, 70%, 60%)\`</span>;
      ctx.<span class="function">fillRect</span>(x, y, <span class="number">30</span>, <span class="number">30</span>);
    }
  }
}
<span class="function">geometric</span>();`,

  drawing: `<span class="comment">// Interactive Drawing Example</span>
<span class="keyword">const</span> canvas = document.<span class="function">getElementById</span>(<span class="string">'canvas'</span>);
<span class="keyword">const</span> ctx = canvas.<span class="function">getContext</span>(<span class="string">'2d'</span>);

<span class="keyword">function</span> <span class="function">drawing</span>() {
  ctx.<span class="function">clearRect</span>(<span class="number">0</span>, <span class="number">0</span>, canvas.width, canvas.height);

  ctx.fillStyle = <span class="string">'#666'</span>;
  ctx.font = <span class="string">'16px Arial'</span>;
  ctx.textAlign = <span class="string">'center'</span>;
  ctx.<span class="function">fillText</span>(<span class="string">'Click and drag to draw!'</span>, <span class="number">175</span>, <span class="number">175</span>);

  <span class="keyword">let</span> isDrawing = <span class="keyword">false</span>;

  canvas.<span class="function">addEventListener</span>(<span class="string">'mousedown'</span>, (e) => {
    isDrawing = <span class="keyword">true</span>;
    ctx.<span class="function">beginPath</span>();
    <span class="keyword">const</span> rect = canvas.<span class="function">getBoundingClientRect</span>();
    ctx.<span class="function">moveTo</span>(e.clientX - rect.left, e.clientY - rect.top);
  });

  canvas.<span class="function">addEventListener</span>(<span class="string">'mousemove'</span>, (e) => {
    <span class="keyword">if</span> (!isDrawing) <span class="keyword">return</span>;

    <span class="keyword">const</span> rect = canvas.<span class="function">getBoundingClientRect</span>();
    ctx.lineWidth = <span class="number">3</span>;
    ctx.lineCap = <span class="string">'round'</span>;
    ctx.strokeStyle = <span class="string">'#ff79c6'</span>;
    ctx.<span class="function">lineTo</span>(e.clientX - rect.left, e.clientY - rect.top);
    ctx.<span class="function">stroke</span>();
  });

  canvas.<span class="function">addEventListener</span>(<span class="string">'mouseup'</span>, () => {
    isDrawing = <span class="keyword">false</span>;
  });
}
<span class="function">drawing</span>();`,

  charts: `<span class="comment">// Data Visualization Example</span>
<span class="keyword">const</span> canvas = document.<span class="function">getElementById</span>(<span class="string">'canvas'</span>);
<span class="keyword">const</span> ctx = canvas.<span class="function">getContext</span>(<span class="string">'2d'</span>);

<span class="keyword">function</span> <span class="function">charts</span>() {
  ctx.<span class="function">clearRect</span>(<span class="number">0</span>, <span class="number">0</span>, canvas.width, canvas.height);

  <span class="keyword">const</span> data = [<span class="number">65</span>, <span class="number">45</span>, <span class="number">80</span>, <span class="number">30</span>, <span class="number">90</span>, <span class="number">55</span>];
  <span class="keyword">const</span> colors = [
    <span class="string">'#ff79c6'</span>,
    <span class="string">'#8be9fd'</span>,
    <span class="string">'#50fa7b'</span>,
    <span class="string">'#f1fa8c'</span>,
    <span class="string">'#bd93f9'</span>,
    <span class="string">'#ffb86c'</span>,
  ];

  <span class="keyword">const</span> barWidth = <span class="number">40</span>;
  <span class="keyword">const</span> maxHeight = <span class="number">200</span>;

  ctx.fillStyle = <span class="string">'#333'</span>;
  ctx.font = <span class="string">'bold 16px Arial'</span>;
  ctx.textAlign = <span class="string">'center'</span>;
  ctx.<span class="function">fillText</span>(<span class="string">'Sample Data Chart'</span>, <span class="number">175</span>, <span class="number">30</span>);

  data.<span class="function">forEach</span>((value, index) => {
    <span class="keyword">const</span> barHeight = (value / <span class="number">100</span>) * maxHeight;
    <span class="keyword">const</span> x = index * <span class="number">50</span> + <span class="number">30</span>;
    <span class="keyword">const</span> y = canvas.height - barHeight - <span class="number">50</span>;

    ctx.fillStyle = colors[index];
    ctx.<span class="function">fillRect</span>(x, y, barWidth, barHeight);

    <span class="comment">// Add shadow effect</span>
    ctx.fillStyle = <span class="string">'rgba(0, 0, 0, 0.1)'</span>;
    ctx.<span class="function">fillRect</span>(x + <span class="number">2</span>, y + <span class="number">2</span>, barWidth, barHeight);
    ctx.fillStyle = colors[index];
    ctx.<span class="function">fillRect</span>(x, y, barWidth, barHeight);

    <span class="comment">// Add value labels</span>
    ctx.fillStyle = <span class="string">'#333'</span>;
    ctx.font = <span class="string">'12px Arial'</span>;
    ctx.textAlign = <span class="string">'center'</span>;
    ctx.<span class="function">fillText</span>(value, x + <span class="number">20</span>, y - <span class="number">10</span>);
  });
}
<span class="function">charts</span>();`,
};

// Canvas drawing functions
const canvasFunctions = {
  geometric: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = i * 40 + 20;
        const y = j * 40 + 20;

        const hue = (i + j) * 30;
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.fillRect(x, y, 30, 30);
      }
    }
  },

  drawing: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#666";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Click and drag to draw!", 175, 175);

    let isDrawing = false;

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      ctx.beginPath();
      const rect = canvas.getBoundingClientRect();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#ff79c6";
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  },

  charts: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = [65, 45, 80, 30, 90, 55];
    const colors = [
      "#ff79c6",
      "#8be9fd",
      "#50fa7b",
      "#f1fa8c",
      "#bd93f9",
      "#ffb86c",
    ];

    const barWidth = 40;
    const maxHeight = 200;

    ctx.fillStyle = "#333";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Sample Data Chart", 175, 30);

    data.forEach((value, index) => {
      const barHeight = (value / 100) * maxHeight;
      const x = index * 50 + 30;
      const y = canvas.height - barHeight - 50;

      ctx.fillStyle = colors[index];
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(x + 2, y + 2, barWidth, barHeight);
      ctx.fillStyle = colors[index];
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "#333";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(value, x + 20, y - 10);
    });
  },
};

// Update line numbers based on code length
function updateLineNumbers(code) {
  const lines = code.split("\n").length;
  const lineNumbersHtml = Array.from(
    { length: lines },
    (_, i) => `<span>${i + 1}</span>`
  ).join("");
  lineNumbers.innerHTML = lineNumbersHtml;
}

// Change example function
function changeExample(exampleType) {
  // Cancel current animation
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  // Update code display
  const code = codeExamples[exampleType];
  codeDisplay.innerHTML = code;
  updateLineNumbers(code);

  // Update canvas
  currentExample = exampleType;
  canvasFunctions[exampleType]();
}

// Event listener for select change
select.addEventListener("change", (e) => {
  changeExample(e.target.value);
});

// Initialize with geometric example
changeExample("geometric");

console.log("Canvas examples initialized successfully!");
