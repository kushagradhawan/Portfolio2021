varying vec2 vUv;

uniform sampler2D uImage;
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform float uAlpha;
uniform vec2 uOffset;

vec2 scaleUV(vec2 uv, float scale) {
  float center = 0.5;
  return ((uv - center) * scale) + center;
}

void main() {

  vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y),
          1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x),
          1.0));

  vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                 vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);

  float r = texture2D(uImage, uv + uOffset * 2.).r;
  vec2 gb = texture2D(uImage, uv).gb;

  //   vec3 color = texture2D(uImage, scaleUV(uv, 0.8)).rgb;
  gl_FragColor = vec4(r, gb, uAlpha);
}