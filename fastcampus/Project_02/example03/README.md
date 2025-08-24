useFrame 훅은 R3F환경에서 3D 렌더링 루프를 커스터마이징하고 각 프레임마다 어떤 동작을 수행할 수 있게 해준다.  
sueFrame훅은 콜백함수가 있고 콜백함수의 매개변수로는 state와 delta를 받는다.  
state: 현재 프레임의 상태 정보를 포함하는 객체  
delta: 마지막 프레임과 현재 프레임 사이의 시간 간격 (보통 초 단위)

## 3D모션 라이브러리

- react-spring
- gsap
- framer-motion-3d

<b>framer-motion-3d를 추천하는 이유</b>

- R3F 공식 독스 추천
- 커뮤니티 지원 , 향후 업데이트
- framer-motion과 같은 방식으로 사용 가능하다.
- 학습이 쉽다.
- 선언식으로 사용된다.

근데 지금 찾아보면  
Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.

다른거 써야할듯

opacity 는 mesh에 직접줘야함

## Raycastion

three.js 환경에서 raycastiong란 3D장면에서 사용자의 마우스가 가리키는 위치를 결정하는 방법이다.
raycastiong은 가상의 광선을 던져서 그 광선이 교차하는 지접을 계산하는 과정이다.
이 지점은 화면상의 3D공간 좌표로 반환된다.  
r3f에서는 canvas를 선언한것만으로 raycaster지원

#### mesh 이벤트

```javascript
<mesh
  onClick={(e) => console.log("클릭")}
  onContextMenu={(e) => console.log("콘텍스트 메뉴, 오른쪽 마우스 클릭")}
  onDoubleClick={(e) => console.log("더블 클릭")}
  onWheel={(e) => console.log("마우스 휠")}
  onPointerUp={(e) => console.log("마우스에서 손 뗐을 때(위로)")}
  onPointerDown={(e) => console.log("마우스 버튼을 눌렀을 때(아래로)")}
  onPointerOver={(e) => console.log("포인터가 객체 위에 올라감")}
  onPointerOut={(e) => console.log("포인터가 객체를 벗어남")}
  onPointerEnter={(e) => console.log("포인터가 객체 내로 들어가는 타이밍")}
  onPointerLeave={(e) => console.log("포인터가 객체에서 벗어나는 타이밍")}
  onPointerMove={(e) => console.log("포인터가 객체내에서 이동 중")}
  onPointerMissed={() => console.log("포인터가 객체내에서 잃어버림")}
  onUpdate={(self) => console.log("프로퍼티가 업데이트됨")}
/>
```

#### framer-motion-3d 이벤트

```javascript
<motion.mesh
 whileHover={{ scale: 1.1 }} //호버 애니메이션
 whileTap={{ scale: 0.9 }} //탭 애니메이션
 onHoverStart={() => console.log('hover start’)} //호버시 실행
 onTap={() => console.log(‘tapped!')} //탭시 실행
/>
```
