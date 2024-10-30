## 04-starlight-earth

RawShaderMaterial : 사용자가 직접 작성한 셰이더 코드 / Three.js가 자동으로 삽입하는 셰이더 코드 생략

gl_Position : **클립 공간(clip space)**

uniform mat4 projectionMatrix; **투영 행렬(Projection Matrix)**은 3D 좌표를 2D 화면에 투영하는 역할  
uniform mat4 viewMatrix; **뷰 행렬(View Matrix)**은 카메라의 위치와 방향을 반영  
uniform mat4 modelMatrix; **모델 행렬(Model Matrix)**은 각 3D 객체(모델)의 위치, 회전, 크기

모델 행렬(modelMatrix): 각 객체의 위치와 회전을 정의  
뷰 행렬(viewMatrix): 카메라의 위치와 방향을 정의  
투영 행렬(projectionMatrix): 3D 장면을 2D 화면에 투영

attribute vec3 position; 각 정점마다 고유한 데이터를 전달 / 정점의 3D 위치 좌표

projectionMatrix _ viewMatrix _ modelMatrix 행렬 연산 !순서가 중요함 결과값에 영향있음

vec4(position, 1.0) : 1.0은 원근값에 영향주는 숫자

uniform mat4 modelViewMatrix; = viewMatrix/modelMatrix 합칠 수 있음

raw 키워드 사용해서 import 하면 플러그인 없이 사용 O

vertex/mesh 위치 바꾸기 차이 : 그냥 볼때는 차이가 없어 보인다
vertex 위치바꾸기 modelPosition.x -= 1.0; : 모든 정점의 위치를 바꿈
mesh 에서 위치바꾸기 mesh.position.y = 1; : 하나의 모델 단위의 위치를 바꿈

mesh에서 정점 값 랜덤으로 보냈을 경우

```javascript
const verticescount = geometry.attributes.position.count;
const randomPositions = new Float32Array(verticescount);

for (let i = 0; i < verticescount; i++) {
  // -1.0 ~ 1.0 사이의 랜덤 값 생성
  randomPositions[i] = (Math.random() - 0.5) * 2;
}

// 랜덤 값을 새로운 BufferAttribute로 설정
geometry.setAttribute(
  'aRandomPosition',
  new THREE.BufferAttribute(randomPositions, 1)
);

const mesh = new THREE.Mesh(geometry, material);
console.log(mesh.position);
```

→ Vector3가 x,y,z 0으로 출력됨 : mesh.position은 정점이 아닌 mesh 위치정보만 의미

fragment 는 attribute 값 전달 x
attribute float aRandomPosition;  
varying float vRandomPosition;  
vRandomPosition = aRandomPosition

three.js에서 시간을 다룰 때는Clock 사용
