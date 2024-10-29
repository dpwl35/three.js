export function convertLatLngToPos(pos, radius) {
  const x = Math.cos(pos.lat) * Math.sin(pos.lng) * radius;
  const y = Math.sin(pos.lat) * radius;
  const z = Math.cos(pos.lat) * Math.cos(pos.lng) * radius;

  return { x, y, z };
}

//three.js에서는 그라디언트 만드는 방법이 따로 없어서 캔버스 활용
export function getGradientCanvas(startColor, endColor) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 250;
  canvas.height = 1;

  const gradient = context.createLinearGradient(0, 0, 256, 0);
  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}
