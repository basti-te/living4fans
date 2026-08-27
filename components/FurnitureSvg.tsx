import { shade } from "@/lib/colors";
import type { Cell } from "@/lib/products";

const CHROME = "#b8b3a9";
const CHROME_DARK = "#948e83";
const TUBE = 3;

type Props = {
  grid: Cell[][];
  color: string;
  cellW?: number;
  cellH?: number;
  className?: string;
  /** Rollen statt Nivellierfüßen (Rollcontainer) */
  casters?: boolean;
};

/**
 * Parametrische Illustration eines USM-Haller-Möbels: verchromtes
 * Rohrgestell mit Kugelverbindern und pulverbeschichteten Flächen.
 * Die Panelfarbe wird per CSS-Transition weich umgefärbt.
 */
export default function FurnitureSvg({
  grid,
  color,
  cellW = 150,
  cellH = 90,
  className,
  casters = false,
}: Props) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 1;
  const legH = 22;
  const m = 8;
  const width = cols * cellW + m * 2;
  const height = rows * cellH + legH + m * 2;

  const panelDark = shade(color, -0.28);
  const panelEdge = shade(color, -0.4);
  const handle = shade(color, -0.45);

  const px = (c: number) => m + c * cellW;
  const py = (r: number) => m + r * cellH;

  const panels: React.ReactNode[] = [];
  const inset = 5;

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const x = px(c) + inset;
      const y = py(r) + inset;
      const w = cellW - inset * 2;
      const h = cellH - inset * 2;
      const key = `p-${r}-${c}`;

      if (cell === "open") {
        panels.push(
          <g key={key}>
            <rect x={x} y={y} width={w} height={h} fill={panelDark} className="l4f-panel-dark" />
            <rect x={x} y={y + h - 4} width={w} height={4} fill={panelEdge} className="l4f-panel-edge" />
          </g>
        );
      } else if (cell === "drawers" || cell === "drawer") {
        const parts = cell === "drawers" ? 2 : 1;
        const gap = 3;
        const ph = (h - gap * (parts - 1)) / parts;
        for (let i = 0; i < parts; i++) {
          const yy = y + i * (ph + gap);
          panels.push(
            <g key={`${key}-${i}`}>
              <rect x={x} y={yy} width={w} height={ph} fill={color} className="l4f-panel" />
              <rect x={x} y={yy} width={w} height={2.5} fill={panelEdge} className="l4f-panel-edge" />
              <rect
                x={x + w / 2 - 14}
                y={yy + 5}
                width={28}
                height={2.5}
                rx={1.25}
                fill={handle}
                className="l4f-panel-handle"
              />
            </g>
          );
        }
      } else {
        // door / flap / panel — geschlossene Fläche
        const handleY = cell === "flap" ? y + 5 : y + h - 8;
        panels.push(
          <g key={key}>
            <rect x={x} y={y} width={w} height={h} fill={color} className="l4f-panel" />
            <rect x={x} y={y} width={w} height={2.5} fill={panelEdge} className="l4f-panel-edge" />
            {cell !== "panel" && (
              <rect
                x={x + w / 2 - 14}
                y={handleY}
                width={28}
                height={2.5}
                rx={1.25}
                fill={handle}
                className="l4f-panel-handle"
              />
            )}
          </g>
        );
      }
    });
  });

  // Rohre: horizontale und vertikale Linien des Gestells
  const tubes: React.ReactNode[] = [];
  for (let r = 0; r <= rows; r++) {
    tubes.push(
      <line
        key={`h-${r}`}
        x1={px(0)}
        y1={py(r)}
        x2={px(cols)}
        y2={py(r)}
        stroke={CHROME}
        strokeWidth={TUBE}
      />
    );
  }
  for (let c = 0; c <= cols; c++) {
    tubes.push(
      <line
        key={`v-${c}`}
        x1={px(c)}
        y1={py(0)}
        x2={px(c)}
        y2={py(rows)}
        stroke={CHROME}
        strokeWidth={TUBE}
      />
    );
  }

  // Kugeln an allen Kreuzungspunkten
  const balls: React.ReactNode[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      balls.push(
        <g key={`b-${r}-${c}`}>
          <circle cx={px(c)} cy={py(r)} r={4.5} fill={CHROME} />
          <circle cx={px(c) - 1.2} cy={py(r) - 1.2} r={1.4} fill="#e8e4dc" />
        </g>
      );
    }
  }

  // Beine mit Füßen oder Rollen
  const legs: React.ReactNode[] = [];
  const bottomY = py(rows);
  for (let c = 0; c <= cols; c++) {
    const x = px(c);
    legs.push(
      <g key={`leg-${c}`}>
        <line x1={x} y1={bottomY} x2={x} y2={bottomY + legH - 6} stroke={CHROME} strokeWidth={TUBE} />
        {casters ? (
          <circle cx={x} cy={bottomY + legH - 4} r={5} fill={CHROME_DARK} />
        ) : (
          <rect x={x - 4} y={bottomY + legH - 6} width={8} height={4} fill={CHROME_DARK} />
        )}
      </g>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Illustration eines USM Haller Möbels"
      style={{ display: "block" }}
    >
      {panels}
      {tubes}
      {balls}
      {legs}
    </svg>
  );
}
