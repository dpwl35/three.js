## 04-starlight-earth

uv좌표는 0.0부터 시작해서 1.1까지의 값을 가진다.  
(0,1) / (1,1)  
(0,0) / (1,0)
0에 가까울수록 검은색 1에 가까울수록 하얀색

기울기가 1인 그래프는 y = x

### 1. 그라데이션

```javascript
float x = vUv.x;
float y = vUv.y;

float col = x;

gl_FragColor = vec4(col, col, col, 1.0);
```

### 2. 대각선 만들기

기울기가 1인 y = x

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(x);
vec3 green = vec3(0.0, 1.0, 0.0);

//if(y <= x + 0.1) : 삼각형 반대는 y + 0.1 >= x
if(y <= x + 0.01 && y + 0.01 >= x) {
    col = green;
}

gl_FragColor = vec4(col, 1.0);
```

### 3. 곡선 만들기

곡선 그래프 y=x<sup>2</sup>

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(x);
vec3 green = vec3(0.0, 1.0, 0.0);

if(x * x <= y && x * x >= y - 0.005) {
    col = green;
}

gl_FragColor = vec4(col, 1.0);
```

### 4. 곡선 + 그라데이션

가파른 곡선 그래프 y=(2x)<sup>2</sup>

```javascript
float x = vUv.x * 2.0;
float y = vUv.y;

vec3 col = vec3(x * x);
vec3 green = vec3(0.0, 1.0, 0.0);

if(x * x <= y && x * x >= y - 0.005) {
    col = green;
}

gl_FragColor = vec4(col, 1.0);
```

수학 공부 삼각함수, 그래프
