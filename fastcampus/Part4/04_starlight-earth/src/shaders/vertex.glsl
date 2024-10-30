uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;

attribute vec3 position;         // 정점 위치
attribute float aRandomPosition; // 랜덤 값

varying float vRandomPosition;   // 프래그먼트 셰이더로 전달할 변수

void main() {
    // 모델 행렬을 사용해 로컬 좌표를 월드 좌표로 변환
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Z축 이동 (랜덤 값 적용)
    modelPosition.z += aRandomPosition * uTime;

    // varying에 값 전달 (프래그먼트 셰이더로 전달) 0~1 사이의 값으로 rgb컬러값이 0~1값이기때문에
    vRandomPosition = (aRandomPosition + 1.0) / 2.0;

    // 투영 행렬과 뷰 행렬을 곱해 최종 좌표를 설정
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}