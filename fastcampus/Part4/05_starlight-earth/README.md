##Starlight Earth

ShaderMaterial 는 map 사용해서 이미지 맵핑 X

```javascript
const createEarth = () => {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: {
        value: textureLoader.load('assets/earth_specular_map.png'),
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide, //front 앞만 렌더링 back 뒤만 렌더링
    transparent: true, //투명도 사용
  });
};
```

```javascript
varying vec2 vUv;

void main()
{
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0) ;

    vUv = uv;
}
```

sampler2D: 셰이더에서 외부로부터 전달받는 2D 텍스처
texture2D 함수는 텍스처 uTexture에서 좌표 vUv에 해당하는 색상을 샘플링합니다.
vUv : vertex shader에서 전달받은 텍스처 좌표(uv 좌표)

fragment에서 색상 반전  
ex) (0.2, 0.5, 0.7)이라면 반전된 색상은 (0.8, 0.5, 0.3)가 됨  
RGB 값에 대해 1 - 값을 취하여 색을 뒤집는 과정  
흰색 (1.0, 1.0, 1.0)은 반전하면 검은색 (0.0, 0.0, 0.0)

```javascript
uniform sampler2D uTexture;
varying vec2 vUv;

void main()
{
  vec4 map = texture2D(uTexture, vUv);
  //vec4 타입의 map 변수에 저장되며, map은 rgba 채널을 가지는 색상 값
  vec3 col = 1.0 - map.rgb;
  float alpha = col.r;

  gl_FragColor = vec4(col, alpha);
}
```

하얀색일땐 투명도가 1 검은색일때는 0로 만들기

```javascript

```

```javascript

```
