uniform sampler2D tDiffuse;
uniform float uTime;

varying vec2 vUv;

//1.reple
// void main() {
//     vec2 toCenter = vUv - 0.5;
//     float dist = length(toCenter); // 0 ~0.5 * 20 => 0 ~10 사이의 값 
//     float dir = dot(toCenter, vec2(1.0, 1.0));
//     float strength = 0.05;

//    // vec2 wave = vec2(sin(dist * 20.0 - uTime * 5.0), cos(dist * 20.0 - uTime * 5.0));
//     vec2 wave = vec2(sin(dist * 20.0 ), cos(dist * 20.0));
//     vec2 newUV = vUv + wave * strength * dir * dist ;

//     vec4 tex = texture2D(tDiffuse, newUV);

//     gl_FragColor = tex;
// }


//2.side
void main () {
    vec2 newUV = vUv;
    // float side = smoothstep(0.2, 0.0, newUV.x) + smoothstep(0.8, 1.0, newUV.x);  
    // newUV.y -= (newUV.y - 0.5) * side * 0.1;

    float side = smoothstep(0.4, 0.0, newUV.y); 
    newUV.x -= (newUV.x - 0.5) * side * 0.05; 

    vec4 tex = texture2D(tDiffuse, newUV);
    vec4 sideColor = vec4(0.0, 0.0, side, 1.0);

    gl_FragColor = tex ;
}