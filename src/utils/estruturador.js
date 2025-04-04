
function desenharPoligono(elemId, pontos = [], options = {}) {
  const elem = document.getElementById(elemId);
  if (!elem || pontos.length < 2) return;
  
  const canvas = document.createElement("canvas");
  canvas.width = elem.offsetWidth;
  canvas.height = elem.offsetHeight;
  const ctx = canvas.getContext("2d");
  elem.appendChild(canvas);
  
  const { fill = 'gray', stroke = 'black', lineWidth = 2 } = options;
  
  ctx.beginPath();
  ctx.moveTo(...pontos[0]);
  for (let i = 1; i < pontos.length; i++) {
    ctx.lineTo(...pontos[i]);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  
  return ctx;
}