// Initialize canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 350;
canvas.height = 350;

let animationFrame;
let time = 0;

// Create gradient backgrounds
function createGradient(x1, y1, x2, y2, colors) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  return gradient;
}

// Draw animated example
function drawAnimatedExample() {
  // Clear canvas with subtle background
  ctx.fillStyle = createGradient(0, 0, canvas.width, canvas.height, [
    "#f8f9ff",
    "#ffffff",
    "#f0f2ff",
  ]);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Floating particles in background
  for (let i = 0; i < 8; i++) {
    const x = (canvas.width / 8) * i + Math.sin(time * 0.01 + i) * 20;
    const y = 50 + Math.cos(time * 0.015 + i) * 15;
    const size = 2 + Math.sin(time * 0.02 + i) * 1;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 121, 198, ${
      0.3 + Math.sin(time * 0.01 + i) * 0.2
    })`;
    ctx.fill();
  }

  // Animated pulsing circle with gradient
  const pulseFactor = 1 + Math.sin(time * 0.02) * 0.2;
  const circleRadius = 40 * pulseFactor;

  ctx.beginPath();
  ctx.arc(175, 120, circleRadius, 0, 2 * Math.PI);

  const circleGradient = ctx.createRadialGradient(
    175,
    120,
    0,
    175,
    120,
    circleRadius
  );
  circleGradient.addColorStop(0, "#ff79c6");
  circleGradient.addColorStop(0.7, "#8be9fd");
  circleGradient.addColorStop(1, "transparent");

  ctx.fillStyle = circleGradient;
  ctx.fill();

  // Add stroke with animation
  ctx.strokeStyle = "#8be9fd";
  ctx.lineWidth = 3 + Math.sin(time * 0.03) * 1;
  ctx.stroke();

  // Rotating rectangle with gradient
  ctx.save();
  ctx.translate(175, 200);
  ctx.rotate(time * 0.01);

  const rectGradient = createGradient(-50, -30, 50, 30, ["#f1fa8c", "#50fa7b"]);
  ctx.fillStyle = rectGradient;
  ctx.fillRect(-50, -30, 100, 60);

  // Add subtle shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillRect(-50, -30, 100, 60);

  ctx.restore();

  // Animated text with glow effect
  ctx.save();
  ctx.shadowColor = "#50fa7b";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "#50fa7b";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";

  const textY = 290 + Math.sin(time * 0.025) * 5;
  ctx.fillText("Beautiful Canvas!", 175, textY);

  // Add second text layer for extra glow
  ctx.shadowBlur = 40;
  ctx.globalAlpha = 0.5;
  ctx.fillText("Beautiful Canvas!", 175, textY);

  ctx.restore();

  // Animated border sparkles
  for (let i = 0; i < 6; i++) {
    const angle = time * 0.02 + (i * Math.PI) / 3;
    const x = 175 + Math.cos(angle) * 140;
    const y = 175 + Math.sin(angle) * 140;
    const sparkleSize = 3 + Math.sin(time * 0.05 + i) * 2;

    ctx.beginPath();
    ctx.arc(x, y, sparkleSize, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(139, 233, 253, ${
      0.6 + Math.sin(time * 0.03 + i) * 0.4
    })`;
    ctx.fill();
  }

  time += 1;
  animationFrame = requestAnimationFrame(drawAnimatedExample);
}

// Start animation
drawAnimatedExample();

// Add resize handler
window.addEventListener("resize", () => {
  drawAnimatedExample();
});

console.log("Beautiful animated canvas initialized successfully!");
