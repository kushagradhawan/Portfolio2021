#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uStrength;
uniform vec2 uViewportSizes;

void main() {
  vUv = uv;
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  newPosition.z += sin(newPosition.y / uViewportSizes.y * 2. * PI + PI * 0.5) *
                   -uStrength * 2.;
  newPosition.y += sin(newPosition.x / uViewportSizes.x * PI + PI) * -uStrength;
  gl_Position = projectionMatrix * newPosition;
}