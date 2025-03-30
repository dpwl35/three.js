## Three.js 연동하기

이미지를 mesh에 입히기  

```javascript
const loadImages = async () => {
    const images = [...document.querySelectorAll('main .content img')];

    const fetchImages = images.map((image) => new Promise((resolve, reject) => {
        image.onload = resolve(image);
        image.onerror = reject;
    }))

    const loadedImages = await Promise.all(fetchImages);

     return loadedImages;
}
```
배열로 감싸서 사용  

three.js 에서 mesh를 만들 때  material에 텍스처 이미지를 정확히 입히기 위해서는 이미지가 로드된 상태여야 한다. (이미지의 위치, 높이, 이런 데이터를 정확히 가져와 만들 수 있음)  

create 함수랑 initialize 함수도 async, await  수정  

## 카메라 시야각 구하기
이미지의 width, height값을 넘겨 줘도 mesh 크기가 커 보이는 이유 : width, height값을 줘도 카메라 위치가 canvas와 mesh가 가까우면 mesh가 더 커보인다.  
  
카메라의 위치와 시야각을 html사이즈와 동일하게 맞추는 작업이 필요.  

camera.fov = ? 값 구하기  
camera.position.set(0, 0, a); a = 카메라와 캔버스 사이의 거리   
tan(theta) = canvas.height / 2 / a   
arctan(canvas.height / 2 / 50 ) = theha  

```javascript
camera.fov = Math.atan(canvasSize.height / 2 / 50 ) * (180 / Math.PI) * 2;
```
const resize = () => {} 함수에도 넣어서 캔버스 사이즈가 바뀌어도 적용되게 함

## mesh와 이미지 위치 맞추기
mesh.position.y = top; 
getBoundingClientRect 로 받아온 이미지 위치 정보 top, left값을 그대로 넣어주면 mesh위치가 다르게 보인다. three.js의 좌표체계와 html의 좌표체계가 달라서 생기는 일이다. 둘의 좌표체계를 맞춰주는 작업이 필요. 

```javascript
mesh.position.y = canvasSize.height / 2 - height / 2 - top;
mesh.position.x = -canvasSize.width / 2 + width / 2 + left;
```  
three.js는 + 가 위로 올라가고 - 가 아래로 내려간다.  

스크롤 이슈 > https://github.com/ashthornton/asscroll 사용  

## canvas 넓이 따라 mesh scale 값 조정하기  
```javascript
const {width: originWidth} = mesh.geometry.parameters;
const scale = width / originWidth; //넓이 갱신
mesh.scale.x = scale;
mesh.scale.y = scale;
```  

## 이미지 입히기
```javascript
const material = new THREE.ShaderMaterial({ 
uniforms : {
    uTexture: {
        value: textureLoader.load(image.src)
        }
    },
... 
});

uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = tex;
}

```
uniforms에 img 주소 값을 넘겨주고 fragment에서 받는다. 


## 파동 효과
```javascript
void main() {

    float dist = length(vUv - 0.5); // 0 ~0.5 * 20 => 0 ~10 사이의 값 

    vec2 wave = vec2(sin(dist * 20.0), cos(dist * 20.0));
    vec2 newUV = vUv + wave * 0.3;

    ...
}
```
wave 작업 : y = sin(x * n) 숫자를 곱해주면 파동이 훨씬 많아진다. cos 마찬가지  

vec2 newUV = vUv; newUv.x += 0.1; 하면 텍스처 끝부분이 늘어나는 것처럼 보인다. 
이런 개념을 활용해서 변형을 주는 것.


*#container가 img보다 z-index가 높으면 hover 이벤트가 발생하지 않기 때문에 이런 부분도 수정  

Raycaster : 오브젝트 교체 여부 판단  
ㄴ intersectObjects : 교차되는 오브젝트를 구하는 함수  
