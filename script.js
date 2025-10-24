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

  clock: `<span class="comment">// Analog Clock Example</span>
<span class="keyword">const</span> canvas = document.<span class="function">getElementById</span>(<span class="string">'canvas'</span>);
<span class="keyword">const</span> ctx = canvas.<span class="function">getContext</span>(<span class="string">'2d'</span>);

<span class="keyword">function</span> <span class="function">clock</span>() {
  <span class="comment">// Clear canvas and reset transformations</span>
  ctx.<span class="function">setTransform</span>(<span class="number">1</span>, <span class="number">0</span>, <span class="number">0</span>, <span class="number">1</span>, <span class="number">0</span>, <span class="number">0</span>);
  ctx.<span class="function">clearRect</span>(<span class="number">0</span>, <span class="number">0</span>, canvas.width, canvas.height);

  <span class="keyword">let</span> radius = canvas.height / <span class="number">2</span>;
  ctx.<span class="function">translate</span>(radius, radius);
  radius = radius * <span class="number">0.9</span>;

  <span class="keyword">function</span> <span class="function">drawClock</span>() {
    <span class="comment">// Clear the area around the clock</span>
    ctx.<span class="function">save</span>();
    ctx.<span class="function">setTransform</span>(<span class="number">1</span>, <span class="number">0</span>, <span class="number">0</span>, <span class="number">1</span>, <span class="number">0</span>, <span class="number">0</span>);
    ctx.<span class="function">clearRect</span>(<span class="number">0</span>, <span class="number">0</span>, canvas.width, canvas.height);
    ctx.<span class="function">restore</span>();

    <span class="function">drawFace</span>(ctx, radius);
    <span class="function">drawNumbers</span>(ctx, radius);
    <span class="function">drawTime</span>(ctx, radius);
  }

  <span class="keyword">function</span> <span class="function">drawFace</span>(ctx, radius) {
    <span class="keyword">const</span> grad = ctx.<span class="function">createRadialGradient</span>(<span class="number">0</span>, <span class="number">0</span>, radius * <span class="number">0.95</span>, <span class="number">0</span>, <span class="number">0</span>, radius * <span class="number">1.05</span>);
    grad.<span class="function">addColorStop</span>(<span class="number">0</span>, <span class="string">'#333'</span>);
    grad.<span class="function">addColorStop</span>(<span class="number">0.5</span>, <span class="string">'white'</span>);
    grad.<span class="function">addColorStop</span>(<span class="number">1</span>, <span class="string">'#333'</span>);
    ctx.<span class="function">beginPath</span>();
    ctx.<span class="function">arc</span>(<span class="number">0</span>, <span class="number">0</span>, radius, <span class="number">0</span>, <span class="number">2</span> * Math.PI);
    ctx.fillStyle = <span class="string">'white'</span>;
    ctx.<span class="function">fill</span>();
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * <span class="number">0.1</span>;
    ctx.<span class="function">stroke</span>();
    ctx.<span class="function">beginPath</span>();
    ctx.<span class="function">arc</span>(<span class="number">0</span>, <span class="number">0</span>, radius * <span class="number">0.1</span>, <span class="number">0</span>, <span class="number">2</span> * Math.PI);
    ctx.fillStyle = <span class="string">'#333'</span>;
    ctx.<span class="function">fill</span>();
  }

  <span class="keyword">function</span> <span class="function">drawNumbers</span>(ctx, radius) {
    ctx.font = radius * <span class="number">0.15</span> + <span class="string">'px arial'</span>;
    ctx.textBaseline = <span class="string">'middle'</span>;
    ctx.textAlign = <span class="string">'center'</span>;
    <span class="keyword">for</span> (<span class="keyword">let</span> num = <span class="number">1</span>; num < <span class="number">13</span>; num++) {
      <span class="keyword">let</span> ang = num * Math.PI / <span class="number">6</span>;
      ctx.<span class="function">rotate</span>(ang);
      ctx.<span class="function">translate</span>(<span class="number">0</span>, -radius * <span class="number">0.85</span>);
      ctx.<span class="function">rotate</span>(-ang);
      ctx.<span class="function">fillText</span>(num.<span class="function">toString</span>(), <span class="number">0</span>, <span class="number">0</span>);
      ctx.<span class="function">rotate</span>(ang);
      ctx.<span class="function">translate</span>(<span class="number">0</span>, radius * <span class="number">0.85</span>);
      ctx.<span class="function">rotate</span>(-ang);
    }
  }

  <span class="keyword">function</span> <span class="function">drawTime</span>(ctx, radius) {
    <span class="keyword">const</span> now = <span class="keyword">new</span> <span class="function">Date</span>();
    <span class="keyword">let</span> hour = now.<span class="function">getHours</span>();
    <span class="keyword">let</span> minute = now.<span class="function">getMinutes</span>();
    <span class="keyword">let</span> second = now.<span class="function">getSeconds</span>();

    <span class="comment">// hour</span>
    hour = hour % <span class="number">12</span>;
    hour = (hour * Math.PI / <span class="number">6</span>) +
          (minute * Math.PI / (<span class="number">6</span> * <span class="number">60</span>)) +
          (second * Math.PI / (<span class="number">360</span> * <span class="number">60</span>));
    <span class="function">drawHand</span>(ctx, hour, radius * <span class="number">0.5</span>, radius * <span class="number">0.07</span>);

    <span class="comment">// minute</span>
    minute = (minute * Math.PI / <span class="number">30</span>) + (second * Math.PI / (<span class="number">30</span> * <span class="number">60</span>));
    <span class="function">drawHand</span>(ctx, minute, radius * <span class="number">0.8</span>, radius * <span class="number">0.07</span>);

    <span class="comment">// second</span>
    second = (second * Math.PI / <span class="number">30</span>);
    <span class="function">drawHand</span>(ctx, second, radius * <span class="number">0.9</span>, radius * <span class="number">0.02</span>);
  }

  <span class="keyword">function</span> <span class="function">drawHand</span>(ctx, pos, length, width) {
    ctx.<span class="function">beginPath</span>();
    ctx.lineWidth = width;
    ctx.lineCap = <span class="string">'round'</span>;
    ctx.<span class="function">moveTo</span>(<span class="number">0</span>, <span class="number">0</span>);
    ctx.<span class="function">rotate</span>(pos);
    ctx.<span class="function">lineTo</span>(<span class="number">0</span>, -length);
    ctx.<span class="function">stroke</span>();
    ctx.<span class="function">rotate</span>(-pos);
  }

  <span class="comment">// Start the clock animation</span>
  <span class="function">drawClock</span>();
  <span class="function">requestAnimationFrame</span>(clock);
}
<span class="function">clock</span>();`,
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

  clock: function () {
    // Clear canvas and reset transformations
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;

    function drawClock() {
      // Clear the area around the clock
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
      const grad = ctx.createRadialGradient(
        0,
        0,
        radius * 0.95,
        0,
        0,
        radius * 1.05
      );
      grad.addColorStop(0, "#333");
      grad.addColorStop(0.5, "white");
      grad.addColorStop(1, "#333");
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
    }

    function drawNumbers(ctx, radius) {
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (let num = 1; num < 13; num++) {
        let ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    }

    function drawTime(ctx, radius) {
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();

      // hour
      hour = hour % 12;
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      drawHand(ctx, hour, radius * 0.5, radius * 0.07);

      // minute
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      drawHand(ctx, minute, radius * 0.8, radius * 0.07);

      // second
      second = (second * Math.PI) / 30;
      drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    function drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    }

    drawClock();
    animationFrame = requestAnimationFrame(canvasFunctions.clock);
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

  // Reset canvas transformations
  ctx.setTransform(1, 0, 0, 1, 0, 0);

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
