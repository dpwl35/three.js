uniform sampler2D uTexture;
varying vec2 vUv;

// 원형 만들기
float circle(vec2 coord, float r) {
    float fromCenter = length(coord - 0.5);
    float strength = r / fromCenter - r * 2.0;
    return strength;
}

void main()
{
    // 올바르게 strength 할당
    float strength = circle(gl_PointCoord, 0.01);

    vec4 map = texture2D(uTexture, vUv);
    vec3 col = 1.0 - map.rgb;
    float alpha = col.r * strength;

    float x = fract(vUv.x * 100.0);
    float y = fract(vUv.y * 100.0);

    float dist = length(vec2(x, y) - 0.5);

    vec3 greenCol = vec3(0.0, 1.0, 0.0);

    vec3 finalCol = mix(greenCol, vec3(0.0), step(0.1, dist));
    finalCol.g += map.r * 2.0;

    // 수정된 코드에서 최종 색상 사용
    gl_FragColor = vec4(greenCol, alpha); 
}