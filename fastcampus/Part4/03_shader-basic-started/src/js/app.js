export default function () {
  const container = document.querySelector('#container');
  const canvas = document.createElement('canvas');

  canvas.width = 300;
  canvas.height = 300;

  container.appendChild(canvas);

  const gl = canvas.getContext('webgl');
  //html5 canvas api 에서 WebGL context를 가져와 작업하는 것

  //Vertex Shader 만들기
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(
    vertexShader,
    `
    attribute vec2 position;
    varying vec2 vPosition;

    void main() {
      vec2 newPosition = (position + 1.0) / 2.0; // 0~1
      gl_Position = vec4(position, 0.0, 1.0);

      vPosition = newPosition;
    }
  `
  );
  gl.compileShader(vertexShader);

  //Fragment Shader 만들기
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    fragmentShader,
    `
    precision mediump float;
    varying vec2 vPosition;

    void main() {
      gl_FragColor = vec4(vPosition, 0.0, 1.0);
    }
  `
  );
  gl.compileShader(fragmentShader);

  //Vertex Shader + Fragment Shader 연결
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  //연결 프로그램 사용 선언
  gl.linkProgram(program);
  gl.useProgram(program);

  //정점 데이터 넘겨주기
  const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  //정점의 위치를 어떻게 계산할지 정보를 넘겨주기 / vertex shader code의 position
  const position = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  //정보에 따라 그림 그리기
  gl.drawArrays(gl.TRIANGLES, 0, 6); //삼각형, 0번째 정점 데이터로부터 6개의 아이템
}
