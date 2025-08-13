# Project2

3D 오브젝트 로드 방법
useLoaders(LoaderType, Resource)

- GLTF
- OBJ
- FBX

GLB파일 : GLB는 GLTF의 이진(binary) 버전으로, 모든 3D 데이터와 자원이 하나의 이진 파일 내에포함됩니다.
그래서 모든 리소스(텍스처, 이미지, 버텍스 데이터, 애니메이션)가 포함되어 있기 때문에 로딩이 빠르
며, 파일 크기가 큰 3D 모델의 전송 및 로딩에 유용하다.

```javascript
 const glb = useLoader(GLTFLoader, ‘/model.glb')
 return <primitive object={glb.scene} />
}
```

## 오류

```
프로젝트 예제 진행에 오류는 없지만...
Drei + CRA + webpack5

WARNING in ./node_modules/@mediapipe/tasks-vision/vision_bundle.mjs
Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
```

env 파일에 추가 하세요.

```
GENERATE_SOURCEMAP=false
```

[완성본 링크] - (https://mr-chu-weather.netlify.app/)
