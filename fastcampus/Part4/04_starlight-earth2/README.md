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

### 5. step

step edge 0.5 자르는 기준

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 green = vec3(0.0, 1.0, 0.0);
float strength = step(0.5, x);

if(strength == 0.0) { //잘라서 안보임
    discard;
}

vec3 col = vec3(strength);
gl_FragColor = vec4(col, 1.0);
```

### 6. min, max

기준부터 그라데이션 발생

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 green = vec3(0.0, 1.0, 0.0);

float strength = max(0.5, x);
//float strength = min(0.5, x);

vec3 col = vec3(strength);

gl_FragColor = vec4(col, 1.0);
```

### 7. clamp

x값의 하한선(이 값보다 작아지면 이 값을 반환), 상향선 정함
변수값이 일정선을 벗어나지 않도록

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 green = vec3(0.0, 1.0, 0.0);

float strength = clamp(x, 0.3, 0.7);

vec3 col = vec3(strength);

gl_FragColor = vec4(col, 1.0);
```

### 8. smooth

0.3부터 0.7은 x좌표값으로 그라데이션

y=t<sup>2</sup>
제곱을 하면 할수록 완만해지는 그래프
y=t<sup>2</sup> \* (3 - 2t)
완만한 굴곡 쉐이더 코드에서 많이 사용하는 공식

```javascript
float x = vUv.x;
float y = vUv.y;

float t = clamp((x - 0.3) / (0.7 - 0.3), 0.0, 1.0);

vec3 green = vec3(0.0, 1.0, 0.0);

float strength = t;

vec3 col = vec3(strength);

gl_FragColor = vec4(col, 1.0);
```

smooth랑 smoothstep함수 알고리즘 동일

```javascript
float smoothy(float edge0, float edge1, float x) {
    float t = clamp((x - 0.3) / (0.7 - 0.3), 0.0, 1.0);
    float strength = t * t * (3.0 - 2.0 * t);
    return strength;
}

void main()
{
    float x = vUv.x;
    float y = vUv.y;

    float strength = smoothy(0.3, 0.7, x);

    vec3 green = vec3(0.0, 1.0, 0.0);

    vec3 col = vec3(strength);

    gl_FragColor = vec4(col, 1.0);
}
```

### 9. mix

mix(1.0, 2.0, 0.0) // 0.0  
mix(1.0, 2.0, 0.25) // 1.25  
mix(1.0, 2.0, 0.5) // 1.5  
1,2번째 인자의 자료형은 float나 vec2, vec3, vec4다 가능

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 green = vec3(0.0, 1.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);

vec3 col = mix(green, blue, x);
// 0.0 green 적용 1.0 blue 적용 0.5 green, blue 중간컬러

gl_FragColor = vec4(col, 1.0);
```

### 10. pow

pow(x, 2.0) = 2제곱 4.0은 4제곱

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(x);
vec3 green = vec3(0.0, 1.0, 0.0);

if(pow(x, 2.0) <= y && pow(x, 2.0)>= y - 0.005) {
    col = green;
}

gl_FragColor = vec4(col, 1.0);
```

### 11. sqrt

y = √x 그래프
sqrt(pow(x, 4.0))

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(x);
vec3 green = vec3(0.0, 1.0, 0.0);

if(sqrt(x) <= y && sqrt(x) >= y - 0.005) {
    col = green;
}

gl_FragColor = vec4(col, 1.0);
```

### 12. mod

숫자를 나눈 나머지 값을 구하는 mod
값을 반복시켜주고 싶을 때

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(mod(x * 7.0, 1.0));
col = step(0.5, col);

vec3 green = vec3(0.0, 1.0, 0.0);

gl_FragColor = vec4(col, 1.0);
```

### 13. fract

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(fract((y - 0.11) * 7.0));
vec3 col2 = vec3(fract(( x- 0.11) * 7.0));

//col = step(0.5, col) * step(0.5, col2);
col = 1.0 -  step(0.5, col) * step(0.5, col2);

fract(0.4); //0.4
fract(2.3); //0.3
fract(5.75); //0.75

vec3 green = vec3(0.0, 1.0, 0.0);

gl_FragColor = vec4(col, 1.0);
```

### 14. sin

y = sin(x \* 10) 파동 그래프
특정한 숫자값의 주기 만들기

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(sin(x * 10.0));


gl_FragColor = vec4(col, 1.0);
```

### 15. cos

y = cos(x \* 10) 파동 그래프
특정한 숫자값의 주기 만들기

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(cos(x * 20.0));


gl_FragColor = vec4(col, 1.0);
```

### 16. abs

숫자의 절대값을 반환
abs(-1) / abs(1) = 둘다 1 반환

```javascript
float x = vUv.x;
float y = vUv.y;

vec3 col = vec3(abs(cos(x * 20.0)));

gl_FragColor = vec4(col, 1.0);
```

### 17. distance

두 정점 사이의 거리값을 반환

```javascript
float x = vUv.x;
float y = vUv.y;

float dist = distance(vec2(x, y), vec2(0.5));
//0.5를 중심으로 방사 그라데이션
dist = step(0.3, dist);
//거리값이 0.3보다 작을때는 0이되어서 검정색 나머지는 1이 되어서 흰색 선명한 원

vec3 col = vec3(dist);

gl_FragColor = vec4(col, 1.0);
```

### 18. length

벡터의 길이를 반환
length는 distance로 구현 가능함

```javascript
float x = vUv.x;
float y = vUv.y;

//float dist = length(x - 0.5);
float dist = length(vec2(x, y) - 0.5);

vec3 col = vec3(dist);

gl_FragColor = vec4(col, 1.0);
```

---

수학 공부 삼각함수, 그래프  
desmos 그래프 사이트

---

https://thebookofshaders.com/glossary/

https://registry.khronos.org/OpenGL-Refpages/gl4/index.php
