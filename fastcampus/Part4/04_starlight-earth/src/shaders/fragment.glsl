 // 부동 소수점 정밀도 선언

uniform sampler2D uTexture;

varying float vRandomPosition; // 정점 셰이더에서 전달된 값
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uTexture, vUv); // 세미콜론 추가
    gl_FragColor = tex * vRandomPosition;

    // 프래그먼트의 색상을 랜덤 값에 따라 설정 (G 채널에 적용)
    // gl_FragColor = vec4(vRandomPosition, vRandomPosition, 1.0, 1.0);
}