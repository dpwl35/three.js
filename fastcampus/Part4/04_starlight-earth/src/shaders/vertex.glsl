uniform float uTime;

in float aRandomPosition; // 랜덤 값

out float vRandomPosition;   // 프래그먼트 셰이더로 전달할 변수
out vec2 vUv;

void main() {
    // 모델 행렬을 사용해 로컬 좌표를 월드 좌표로 변환
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Z축 이동 (랜덤 값 적용)
    modelPosition.z += aRandomPosition  / 20.0 * sin(uTime); 
    //modelPosition.z += sin(uTime + modelPosition.x) / 2.0;

    // varying에 값 전달 (프래그먼트 셰이더로 전달) 0~1 사이의 값으로 rgb컬러값이 0~1값이기때문에
    vRandomPosition = (aRandomPosition + 1.0) / 2.0;
    vRandomPosition /= uTime * 0.3;

    //이미지
    vUv = uv;

    // 투영 행렬과 뷰 행렬을 곱해 최종 좌표를 설정
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}