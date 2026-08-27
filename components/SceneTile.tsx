import FurnitureSvg from "./FurnitureSvg";
import type { Cell } from "@/lib/products";

const WALLS = {
  light: { wall: "#ece3d5", floor: "#ddd1bf" },
  mid: { wall: "#e2d6c3", floor: "#d2c4ae" },
  warm: { wall: "#d9c9b2", floor: "#c8b69c" },
  deep: { wall: "#77664f", floor: "#63543f" },
} as const;

export type WallTone = keyof typeof WALLS;

type Props = {
  grid: Cell[][];
  color: string;
  wall?: WallTone;
  cellW?: number;
  cellH?: number;
  casters?: boolean;
  /** Anteil der Möbelbreite an der Kachelbreite (0–1) */
  scale?: number;
  aspect?: string;
  className?: string;
};

/**
 * Inszeniert ein Möbel vor einer warmen Putzwand mit harter Bodenlinie
 * und flachem Schlagschatten — die "Fotografie" des Systems.
 */
export default function SceneTile({
  grid,
  color,
  wall = "light",
  cellW,
  cellH,
  casters,
  scale = 0.72,
  aspect = "1 / 1",
  className,
}: Props) {
  const tone = WALLS[wall];
  return (
    <div
      className={`scene ${className ?? ""}`}
      style={{
        background: tone.wall,
        aspectRatio: aspect,
      }}
    >
      <div className="scene-floor" style={{ background: tone.floor }} />
      <div className="scene-furniture" style={{ width: `${scale * 100}%` }}>
        <FurnitureSvg grid={grid} color={color} cellW={cellW} cellH={cellH} casters={casters} />
        <div className="scene-shadow" />
      </div>
    </div>
  );
}
