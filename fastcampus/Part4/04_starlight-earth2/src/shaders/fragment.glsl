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

//float dist = length(x - 0.5); 
float dist = length(vec2(x, y) - 0.5);

vec3 col = vec3(dist);

gl_FragColor = vec4(col, 1.0);
}