# Three.js R3F 차이점

R3F

- React에 친화적
- .jsx(tsx)문법 사용
- 같은 기능을 구현할 때 작성할 코드 양이 적음
- 동일한 기능을 하는 Shortcut 기능 (drei, postproessing 등)이 존재함

# drei에서 제공해주는 기본 컴포넌트가 있음

```javascript
<mesh position-y={0.5} castShadow receiveShadow>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color={0xff0000} />
</mesh>

<Box args={[1, 2, 1]} material-color={0x00ff00} position={[2, 1, 0]} />
```

숏컷 기능을 통해 생성하게 되면 좋은 점

- 코드가 간단
- 성능이 더 좋다. 내부적으로 구현이 되기 때문에 gpu를 더 효율적으로 씀

<br />
<br />

# GLTFJSX 라이브러리

React Three Fiber(R3F)에서 .glb 또는 .gltf 모델 파일을 JSX 형태로 변환해주는 CLI 도구

```bash
npx gltfjsx public/dancer.glb -o src/components/Dancer.jsx
```

# r3f postprocessing

https://react-postprocessing.docs.pmnd.rs/effects/autofocus
