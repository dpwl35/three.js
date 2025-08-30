## Drei

```javascript
<Environment preset="city" background />
```

HDRI(High Dynamic Range Image) 환경 맵을 로딩해서 장면의 라이팅과 배경으로 적용해 준다.  
블렌더에서 쓰는 스튜디오 HDRI 파일(.hdr, .exr) 그대로 불러와서 쓸 수 있다.

#### Html 컴포넌트

```html
<html as="div" wrapperClass center fullscreen>
  <h1>hello world</h1>
</html>
```

#### Orbitcontrols

```javascript
<Canvas>
  <OrbitControls
  enabled={}
  target={}
  minDistance={}
  maxDistance={}
  minZoom={}
  maxZoom={}
  minPolarAngle={}
  .
  .
  .
  />
</Canvas>
```

- enabled : 카메라를 자유자재로
  enbleDamping : 마우스를 멈췄을 때 약간의 움직임 dampingFactor 로 강도 조절
- target: 카메라 도는 위치 선정
- minDistance/maxDistance : 확대 축소 설정
- enabledZoom : zoom 금지
- zoomSpeed : 줌스피드
- minZoom / maxZoom : 카메라가orthographic 이어야 작동
- minPolarAngle
- autoRotate={true}
  autoRotateSpeed={2.0} 돌리기

orthographic 원근감이 없는 2d작업할 때

#### 3D오브젝트 클릭시 포커스 및 아웃

Bounds 컴포넌트

```javascript
<Bounds fit clip observe onFit={()=> } margin={1} damping={1}>
<mesh/>
</Bounds>
```

- fit : 주어진 객체나 경계 상자에 맞게 카메라가 조정되어 해당 객체 또는 경계 상자가 화면에 모두 나타나도록 합니다. 처음 렌더링 시 초기 뷰를 설정하는 데 사용됩니다.
- clip: 바운딩 박스가 화면을 벗어나지 않도록 자동으로 클리핑됩니다. 즉, 너무 큰 객체가 화면을 벗어나지 않도록 보장합니다.
- observe: 속성은 창 크기가 변경될 때마다 바운딩 박스를 새로 조정하는 데 사용됩니다. 창의 크기가 변경되면 렌더링된 3D 씬에 맞게 새로운 바운딩 박스
  를 계산하고 카메라를 조정하여 적절한 뷰를 유지합니다.
- margin : 여백을 추가하면 객체가 화면 가장자리에 가까워지는 것을 방지할 수 있습니다.
- onfit : 바운딩 박스가 조절된 후에 호출됩니다. 이를 통해 필요한 추가 동작을 수행할 수 있습니다.
- damping: 바운딩 박스의 조절이나 애니메이션에 적용되는 계수를 나타냅니다. 움직임을 부드럽게 만들어주는 역할을 합니다. 값이 클수록 더 큰 감쇠가 적용됩니다.

useBounds 훅

```javascript
const bounds = useBounds();
bounds.refresh();
bounds.getSize();
bounds.clip();
bounds.fit();
```

useBounds 훅은 현재 바운딩 박스의 상태를 가져오고, 바운딩 박스를 조절하거나 업데이트하는 데 사용됩니다.  
getSize, refresh, clip, fit 메서드를 가지고 있습니다.
