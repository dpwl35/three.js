precision mediump float;

varying vec2 vUv;

float smoothy(float edge0, float edge1, float x) {
    float t = clamp((x - 0.3) / (0.7 - 0.3), 0.0, 1.0);
    float strength = t * t * (3.0 - 2.0 * t);
    return strength;
}

void main()
{
    float x = vUv.x;
    float y = vUv.y;

    vec3 green = vec3(0.0, 1.0, 0.0);
    vec3 blue = vec3(0.0, 0.0, 1.0);

    vec3 col = mix(green, blue, x);
    // 0.0 green 적용 1.0 blue 적용 0.5 green, blue 중간컬러
    
    gl_FragColor = vec4(col, 1.0);
}