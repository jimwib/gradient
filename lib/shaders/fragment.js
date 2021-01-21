const fragment = `varying vec3 v_color; varying vec2 vUv;


void main() {
  vec3 color = v_color;
  vec2 q = vec2(vUv - 0.5);
  float scale = 1.0;

  if (u_darken_top == 1.0) {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }
 
  float ff = resolution.x - gl_FragCoord.x ;
        
  gl_FragColor = vec4(color, ff);
}`
module.exports = {
  fragment,
}
