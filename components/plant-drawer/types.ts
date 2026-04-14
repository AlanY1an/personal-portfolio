// Ported from ste-vg/plant-drawer (ISC).
// https://github.com/ste-vg/plant-drawer

export interface Position {
  x: number;
  y: number;
}

export interface BranchSettings {
  x: number;
  y: number;
  directionX?: number;
  directionY?: number;
  length?: number;
  sections: number;
  width?: number;
  chunkLength?: number;
  color?: string;
  progress?: number;
  opacity?: number;
}

export enum BranchState {
  ready,
  animating,
  ended,
}

export interface FlowerColors {
  outer: string;
  inner: string;
}

export interface Out {
  position: Position;
  width?: number;
  sections?: number;
}
