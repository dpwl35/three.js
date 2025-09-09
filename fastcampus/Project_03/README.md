# 3D 인터랙티브 웹 개발 분야 이론 및 실습 강의 / 파트3

# 3D 물리엔진 자동차 웹

## 3D 개발 환경 구현

- [ ] 프로젝트 설명 (r3f, cannon)
- [ ] use-cannon 라이브러리 소개
- [ ] leva 라이브러리 소개
- [ ] 물리 엔진 기본 1편 (useBox, useShpere, useCylinder, usePlane )
- [ ] 물리 엔진 기본 2편 (useTrimesh, useConvexPolyhedron )

## Cannon 활용 자동차 구현

- [ ] 물리 엔진을 가진 자동차의 바디 만들기 (useBox)
- [ ] 물리 엔진을 가진 바퀴 만들기 (useCompoundBody)
- [ ] 키보드를 통한 바퀴 제어 로직 만들기
- [ ] 물리엔진 Static, Kinematic, Dynamic 이해하기
- [ ] useBox, useSphere로 충돌체 만들기 구체, 박스 (Dynamic)
- [ ] 벽과 고정체 만들기 (Static)
- [ ] 자동차를 따라다니는 카메라 만들기 (useThree)

## 3D 오브젝트 실제 모델 적용하기

- [ ] gltfjsx로 소개 및 glb 파일을 jsx로 변환하기
- [ ] 자동차 바디 glb 모델로 적용하기
- [ ] 자동차 바퀴 glb 모델로 적용하기
- [ ] 충돌 모델 glb 모델로 적용하기
- [ ] Text 3D 모델 넣기

## 이벤트 및 모션 만들기

- [ ] recoil 전역값 관리 학습
- [ ] 페이지 진입시 인 모션 만들기
- [ ] 물체 충돌 UI 팝업 생성
- [ ] 물체 충돌시 물체 회전 (간판 회전)
- [ ] 물체 마우스 클릭시 페이지 이동
- [ ] 특정 지역 진입시 이벤트 발생
- [ ] 특정 지역 진입시 이벤트2 발생

## 프로젝트 최적화 알아보기

- [ ] FPS 개념과 확인(stats)
- [ ] 최적화 알아보기 (DrawCall)
- [ ] Json 폰트 최적화
- [ ] Webp로 텍스처 압축
- [ ] 모델 최적화 (glb, Draco 압축)

[완성본 링크] - (https://mr-chu-car-web.netlify.app/)

## Leva 라이브러리 사용하기

```javascript
import { useControls } from “leva"
const bgValue = useControls({ bgColor: '#fff', })
```

## useComposundBody

여러 개의 간단한 형태의 물체를 조합하여 하나의 복잡한 물체를 만들 수 있게 된다.  
useTrimesh 나 useConvexPolyhedron은 각각의 도형에 대한 별도의 계산을 수행해야 합니다. 반면에 useCompoundBody를 사용하면 하나의 복합된 물체로 취급되므로 물리 엔진은 이를 최적화하여 전체적인 성능을 향상시킬 수 있습니다.

또한 useTrimesh 나 useConvexPolyhedron 보다 충돌 감지가 더 효과적입니다.

```javascript
import { useCompoundBody } from “@react-three/cannon";
const [ref, api] = useCompoundBody(
 () => ({
position,
mass: 1,
shapes: [
 { args:[1,2,1], type: “Box” },
 { args:[1],type: "Sphere"}
 ],
 }),
 useRef(null)
);
```

## useRaycastVehicle

키보드를 통한 바퀴 제어 로직

```javascript
const [vehicle, vehicleApi] = useRaycastVehicle(
  () => ({
    chassisBody,
    wheelInfos,
    wheels,
  }),
  useRef(null)
);
vehicleApi.applyEngineForce(120, 2);
vehicleApi.setSteeringValue(0, 1);
vehicleApi.setBrake(0, 3);
```

## 물리엔진 Static, Kinematic, Dynamic

- Static (정적)

  - 움직이지 않으며 고정된 위치에 존재합니다.
  - 주로 화면상에서 움직이지 않는 요소들에 사용됩니다. (예: 벽, 바닥 등) -물체는 물리 시뮬레이션에 참여하지만, 중력이나 다른 외력에 의해 움직이지 않습니다.

Kinematic 사용법

```javascript
const [ref, api] = useBox(
  () => ({
    args: [1, 0.2, 1],
    position,
    mass: 1,
    type: "Kinematic",
  }),
  useRef(null)
);
```

- Kinematic (운동)

  - 사용자가 직접 제어하거나 물리 시뮬레 이션에 의해 움직이지 않는 물체입니다.
  - 주로 플레이어 캐릭터나 움직이는 플랫 폼과 같은 요소에 사용됩니다.
  - 물리 시뮬레이션은 물체에 영향을 미치지 않고, 사용자(개발자)가 직접 위치와 속도를 조절할 수 있습니다

- Dynamic (동적)
  - 물리 시뮬레이션에 의해 영향을 받아움직이는 물체입니다.
  - 주로 공, 상자 등
  - 중력이나 다른 외력에 의해 영향을 받아 움직입니다.
