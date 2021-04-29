varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uStrength;

void main() {
  vec2 uv = vUv;
  gl_FragColor = texture2D(tDiffuse, uv);

  gl_FragColor.rgb = texture2D(tDiffuse, uv).rgb;
}