precision mediump float;

varying vec2 vUv;

void main()
{
    float x = vUv.x * 2.0;
    float y = vUv.y;

    vec3 col = vec3(x * x);
    vec3 green = vec3(0.0, 1.0, 0.0);

    if(x * x <= y && x * x >= y - 0.005) {
        col = green;
    }

    gl_FragColor = vec4(col, 1.0);
}