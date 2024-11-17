## Starlight Earth

### 알파맵 효과

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

### 도트 패턴 효과

13예제로 만든 fract 사용  
fract의 실수의 소수점을 반환해주는 함수 사용 : UV 값을 몇배로 곱해서 커진 UV 좌표의 소수점을 반환 0~1사이의 값이 곱해진 배수만큼 반복
컬러가 0.9보다 작을 때 0이 되도록 : 검은색이 더 많이 보임

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col1 = vec3(fract(x * 100.0));
vec3 col2 = vec3(fract(y * 100.0));

vec3 greenCol = vec3(0.0, 1.0, 0.0);

vec3 finalCol = step(0.9, col1) *  step(0.9, col2);
finalCol *= greenCol;

gl_FragColor = vec4(finalCol , 1.0);
```

### 도트 패턴 효과2 : 사각형 원형으로 만들기

특정 x,y 좌표가 0.5라는 중점을 기준으로 얼마나 멀어져 있는지 계산

```javascript
float x = fract(vUv.x * 100.0);
float y = fract(vUv.y * 100.0);

float dist = length(vec2(x, y) - 0.5);

vec3 greenCol = vec3(0.0, 1.0, 0.0);

vec3 finalCol = mix(greenColor, vec3(0.0), step(0.1, dist));
finalCol.g += map.r * 2.0;

gl_FragColor = vec4(finalCol , alpha);
```

### 검정 부분 투명도

```javascript
vec3 finalCol = mix(greenColor, vec3(0.0), step(0.1, dist));
finalCol.g += map.r * 2.0;

gl_FragColor = vec4(finalCol , alpha * finalCol.g);
```

### IcosahedronGeometry 포인트 만들기

ShaderMaterial는 균일하지 않아서 동그라미가 퍼져보이는데 IcosahedronGeometry는 wireframe 확인했을 때 삼각형이 균일한 모양으로 구체를 만들고있다.

y= x/r - r \* 2.0 그래프
중점에서 멀어질수록 투명해진다

```javascript
float circle(vec2 coord, float r) {
    float fromCenter = length(coord - 0.5);
    float strength = r / fromCenter - r * 2.0;
}
```

### createEarthGlow

글로우 효과
normal : 물체의 면이 향하는 방향, 정점들의 수직으로 뻗은 선  
wireframe: true 확인하면 선분이 보임

```javascript
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
const glowNormalsHelper = new VertexNormalsHelper(earthGlow, 0.1); //확인할 material, 길이
```
