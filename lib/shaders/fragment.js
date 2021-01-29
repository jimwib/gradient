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
  float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
  }

void main() {
  float opacity = 1.0;
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec4 color = vec4(v_color,1.0);

  // Grain
  float strength = 16.0;
  float x = (st.x + 4.0 ) * (st.y + 4.0 ) * (u_time / 1000.0);
  vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;

  grain = 1.0 - grain;
	color = color * grain;

  // Blending out
  float y = 0.0;
  // if its at the top of the screen dont fade the top
  if (u_darken_top == 1.0) {  
     y = smoothstep(-0.052,0.725,st.y);
  } else {
    y = parabola(st.y,1.25);
  }

  vec4 grey = vec4(0.957,0.945,0.937,1.0);
  color = mix(grey,color, vec4(y));
  
  // 1.0 is the opacity
  gl_FragColor = color;
 
}
`;

module.exports = {
  fragment
};
