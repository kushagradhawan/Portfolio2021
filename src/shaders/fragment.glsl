varying vec2 vUv;

uniform float time;
uniform sampler2D uImage;

void main()	{
	vec4 image = texture2D(uImage, vUv);
	gl_FragColor = image;
}