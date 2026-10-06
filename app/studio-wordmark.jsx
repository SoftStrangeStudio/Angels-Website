// Single-line pen paths: each curve follows the order a hand would draw it.
const letters = {
  S: { width: 16, path: "M14 7 C10 2 2 4 3 10 C4 14 14 13 13 19 C12 26 3 27 1 22" },
  o: { width: 12, path: "M10 15 C7 11 2 14 2 20 C2 26 9 26 11 19 C12 15 9 12 6 14" },
  f: { width: 10, path: "M2 29 C3 23 4 12 6 7 C8 2 12 4 10 8 C8 11 4 13 2 14 M1 17 L10 16" },
  t: { width: 10, path: "M6 8 C5 13 3 20 4 24 C5 27 8 24 9 23 M1 15 L10 14" },
  r: { width: 10, path: "M2 15 L1 25 C2 19 5 12 8 14 C9 14 9 16 8 17" },
  a: { width: 13, path: "M10 15 C7 12 2 15 2 21 C2 27 8 25 10 17 L9 24 Q10 27 12 23" },
  n: { width: 13, path: "M2 15 L1 25 C3 19 6 12 9 15 C12 18 7 26 12 24" },
  g: { width: 13, path: "M10 15 C7 12 2 15 2 21 C2 27 9 25 10 17 C9 24 10 32 6 34 C2 36 0 31 4 29 L12 25" },
  e: { width: 12, path: "M2 20 C6 20 12 16 9 14 C5 11 1 17 2 22 C3 27 8 26 11 23" },
  u: { width: 13, path: "M3 15 C2 19 0 26 4 25 C8 25 9 19 10 15 L9 24 Q10 27 12 23" },
  d: { width: 13, path: "M10 15 C6 12 2 16 2 22 C2 27 8 25 10 18 L12 5 C11 11 8 24 10 25 L12 23" },
  i: { width: 7, path: "M3 16 C2 20 1 26 5 24 M4 10 L4.2 10.2" }
};

const words = "Soft Strange Studio";
let penX = 4;
let strokeIndex = 0;
const strokes = Array.from(words, (letter) => {
  if (letter === " ") {
    penX += 9;
    return null;
  }
  const glyph = letters[letter];
  const stroke = { ...glyph, x: penX, index: strokeIndex++ };
  penX += glyph.width + 1;
  return stroke;
}).filter(Boolean);

export default function StudioWordmark() {
  return (
    <svg className="studio-wordmark" viewBox={`0 0 ${penX + 4} 40`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((stroke) => (
          <path
            key={stroke.index}
            d={stroke.path}
            pathLength="1"
            transform={`translate(${stroke.x} ${stroke.index % 3 === 0 ? 1 : 0})`}
            style={{ "--pen-delay": `${stroke.index * 140}ms`, strokeWidth: stroke.index % 4 === 0 ? 1.65 : 1.4 }}
          />
        ))}
      </g>
    </svg>
  );
}
