varying vec2 vUv;

uniform sampler2D uImage;
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform float uStrength;

void main() {

  vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y),
          1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x),
          1.0));

  vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                 vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);

  // gl_FragColor.rgb = texture2D(uImage, uv).rgb;
  gl_FragColor.r = texture2D(uImage, uv + 0.0008 * -uStrength).r;
  gl_FragColor.g = texture2D(uImage, uv + 0.0002 * -uStrength).g;
  gl_FragColor.b = texture2D(uImage, uv).b;
  gl_FragColor.a = 1.0;

  // vec4 image = texture2D(uImage, vUv);
  // gl_FragColor = image;
}