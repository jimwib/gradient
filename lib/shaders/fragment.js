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

float plot(vec2 st, float pct){
return  smoothstep( pct-0.02, pct, st.y) -
        smoothstep( pct, pct+0.02, st.y);
}

void main() {

  float opacity = 1.0;
  vec2 st = gl_FragCoord.xy/resolution.xy;


  float y = 0.0;
  // if its at the top of the screen dont fade the top
  if (u_darken_top == 1.0) {  
     y = smoothstep(-0.052,0.725,st.y);

  } else {
    y = parabola(st.y,1.25);
  }
	vec3 red = vec3(0.957,0.945,0.937);
    vec3 blue = v_color;
    vec3 color = mix(red,blue, vec3(y));
    // 1.0 is the opacity
    gl_FragColor = vec4(color,opacity);

 
}

`;

module.exports = {
  fragment
};
