#version 300 es

precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uReducedMotion;

float sdCircle(vec2 point, float radius) {
  return length(point) - radius;
}

float sdRoundedBox(vec2 point, vec2 bounds, float radius) {
  vec2 distanceToEdge = abs(point) - bounds + radius;
  return min(max(distanceToEdge.x, distanceToEdge.y), 0.0)
    + length(max(distanceToEdge, 0.0)) - radius;
}

float sdSegment(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  float amount = clamp(dot(point - start, segment) / dot(segment, segment), 0.0, 1.0);
  return length(point - start - segment * amount);
}

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x),
    mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0)), local.x),
    local.y
  );
}

void main() {
  vec2 uv = vUv;
  vec2 point = uv * 2.0 - 1.0;
  point.x *= uResolution.x / max(uResolution.y, 1.0);

  float motion = 1.0 - uReducedMotion;
  float pulse = 0.5 + 0.5 * sin(uTime * 1.25);
  vec2 drift = (uPointer - 0.5) * vec2(0.055, 0.035) * motion;
  point -= drift;

  vec2 bulbPoint = point - vec2(0.0, 0.20);
  float glass = sdCircle(bulbPoint, 0.34);
  float neck = sdRoundedBox(point - vec2(0.0, -0.13), vec2(0.145, 0.20), 0.055);
  float body = min(glass, neck);

  float socket = sdRoundedBox(point - vec2(0.0, -0.43), vec2(0.18, 0.12), 0.045);
  float base = sdRoundedBox(point - vec2(0.0, -0.57), vec2(0.105, 0.045), 0.028);
  float silhouette = min(body, min(socket, base));

  float edge = 1.0 - smoothstep(-0.012, 0.016, silhouette);
  float glassInterior = 1.0 - smoothstep(-0.020, 0.025, glass);
  float socketInterior = 1.0 - smoothstep(-0.012, 0.018, min(socket, base));
  float halo = exp(-6.5 * max(glass, 0.0));
  float wideHalo = exp(-2.8 * max(glass, 0.0));

  float grain = noise(point * 18.0 + vec2(uTime * 0.08 * motion, 0.0));
  float warmth = 0.82 + 0.13 * pulse * motion + 0.08 * grain;
  vec3 paperGold = vec3(0.96, 0.69, 0.34);
  vec3 warmCream = vec3(1.0, 0.93, 0.73);
  vec3 socketInk = vec3(0.35, 0.31, 0.27);

  float filament = min(
    sdSegment(point, vec2(-0.075, 0.04), vec2(-0.025, 0.23)),
    sdSegment(point, vec2(0.075, 0.04), vec2(0.025, 0.23))
  );
  filament = min(filament, sdSegment(point, vec2(-0.025, 0.23), vec2(0.025, 0.23)));
  float filamentLine = 1.0 - smoothstep(0.008, 0.021, filament);

  vec3 color = vec3(0.0);
  color += paperGold * halo * (0.24 + 0.07 * pulse * motion);
  color += paperGold * wideHalo * 0.055;
  color = mix(color, mix(paperGold, warmCream, 0.48 + 0.18 * warmth), glassInterior * 0.88);
  color = mix(color, socketInk, socketInterior * 0.94);
  color += warmCream * filamentLine * 0.9;

  float socketStripe = 1.0 - smoothstep(
    0.0,
    0.018,
    abs(fract((point.y + 0.56) * 18.0) - 0.5) - 0.19
  );
  color += vec3(0.20, 0.17, 0.15) * socketStripe * socketInterior * 0.22;

  float alpha = clamp(max(edge, halo * 0.42 + wideHalo * 0.055), 0.0, 1.0);
  color *= alpha;
  fragColor = vec4(color, alpha);
}
