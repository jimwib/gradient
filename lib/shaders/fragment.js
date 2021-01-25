// const fragment = `varying vec3 v_color;

// void main() {
//   // vec3 color = v_color;
//   // float steps   = 4.0;
//   // // if (u_darken_top == 1.0) {
//   // //       vec2 st = gl_FragCoord.xy/resolution.xy;
//   // //       color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
//   // // }
//   // vec2 st = gl_FragCoord.xy/resolution.xy;
//   // float alpha  = floor(st.y * steps) / steps;

//   // vec4 color1 = vec4(v_color, 1.0);
//   // // vec4 color2 = vec4(0.957,0.945,0.937, 1.0);
//   // vec4 color2 = vec4(1.0,0,0, 1.0);
//   // vec2 distV     = gl_FragCoord.xy/resolution.xy * 2.0 - 1.0;
//   // float maxDist  = max(abs(distV.x), abs(distV.y)) * 0.1;
//   // float circular = length(distV);
//   // float square   = maxDist;

//   // // vec4(v_color, 1.0); //
//   // gl_FragColor = mix(color1, color2, mix(circular,square,maxDist));

//   // float steps   = 4.0;
//   //float steps   = 8.0;
//   //float steps   = 16.0;
//   // float steps   = 32.0;
//   // vec4 v_colour =  vec4(v_color, 1.0);
//   // vec3 gradColor = floor(v_colour.rgb * steps) / steps;
//   // gl_FragColor   = vec4(gradColor, 1.0);

//     vec4 color1 = vec4(1.0,0,0, 1.0);
//     // vec4 color2 = vec4(0.957,0.945,0.937, 1.0);
//     vec4 color2 = vec4(0,1.0,0, 1.0);

//     vec2 distV     = (gl_FragCoord.xy/resolution.xy * 2.0 - 1.0) ;
//     float maxDist  = max(abs(distV.x), abs(distV.y));
//     float circular = length(distV);
//     float square   = maxDist;

//     gl_FragColor =  vec4(v_color, 1.0); // mix(color1, color2, mix(circular,square, maxDist ));

// }`;

const fragment = `

varying vec3 v_color;

void main() {
  vec4 color1 = vec4(v_color, 1.0);
  // vec4 color1 = vec4(1.0,0.0,0, 1.0);
  vec4 color2 = vec4(0.957,0.945,0.937, 1.0);

  if (u_darken_top == 1.0) {  
    vec2 st = gl_FragCoord.xy/resolution.xy;
    gl_FragColor = mix(color2, color1, st.y );
  } else {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    vec2 uvn=abs(uv-0.5)*2.0;
    float maxc=max(uvn.y,uvn.x);
    vec3 mate=vec3(uvn.y);

    gl_FragColor = mix(color1, color2, uvn.y );
  }
 
}

`;

module.exports = {
  fragment
};
