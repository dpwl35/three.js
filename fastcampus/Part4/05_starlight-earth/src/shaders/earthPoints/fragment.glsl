uniform sampler2D uTexture;
varying vec2 vUv;
varying float vDistance;

// 원형 만들기
float circle(vec2 coord, float r) {
    float fromCenter = length(coord - 0.5);
    float strength = r / fromCenter - r * 2.0;

    return strength;
}

void main()
{
    vec4 map = texture2D(uTexture, vUv);
    // 올바르게 strength 할당
    vec3 col = 1.0 - map.rgb;

    float strength = circle(gl_PointCoord, 0.01);
    float alpha = col.r * strength * vDistance;

    vec3 greenCol = vec3(0.0, 1.0, 0.0);

    vec3 finalCol = greenCol;

    // 수정된 코드에서 최종 색상 사용
    gl_FragColor = vec4(greenCol, alpha); 
}