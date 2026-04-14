// Ported from ste-vg/plant-drawer (ISC).
// Refactored to decouple from DOM templates, click handling, and resize logic.

import { gsap } from "gsap";
import { debounceTime, take } from "rxjs/operators";
import { Branch, BranchSpawnRates } from "./branch";
import { Flower } from "./flower";
import { Leaf } from "./leaf";
import { Thorn } from "./thorn";
import {
  BranchSettings,
  BranchState,
  FlowerColors,
  Out,
  Position,
} from "./types";

export interface EngineGroups {
  branchGroup: SVGGElement;
  thornGroup: SVGGElement;
  leafGroup: SVGGElement;
  flowerGroup: SVGGElement;
}

export interface Anchor {
  position: Position;
  // Force a starting direction. -1 | 0 | 1. Omit for random.
  directionX?: number;
  directionY?: number;
}

export interface PathSpec {
  // Pre-defined SVG path `d` attribute that the main stem follows.
  d: string;
  // Where the path starts in SVG coordinates (used for sub-branch origins).
  start: Position;
  // Optional sections override — controls tween duration and spawn gating.
  sections?: number;
}

export interface EngineOptions extends EngineGroups {
  // Number of sections per branch. Lower = smaller plants. Original uses 16.
  sections?: number;
  // Pixel grid for branch step size. Original uses 40-50.
  grid?: number;
  // Duration multiplier per section (seconds). Original uses 0.4. Higher = slower growth.
  branchSpeed?: number;
  // Per-onUpdate probability of spawning each decoration type.
  // Original: branch 0.02, thorn 0.1, flower 0.2, leaf 0.4.
  spawnRates?: Partial<BranchSpawnRates>;
  // Per-type multipliers applied to the size passed to each decoration.
  // Default 1 matches the original plant-drawer proportions.
  leafScale?: number;
  flowerScale?: number;
  thornScale?: number;
  // Hard cap on decorations spawned by a single branch. Applied via
  // rxjs take() on each decoration subject. Defaults leave the original
  // probability-driven behavior intact.
  maxPerBranch?: {
    branch?: number;
    thorn?: number;
    flower?: number;
    leaf?: number;
  };
}

export class PlantEngine {
  private groups: EngineGroups;
  private branches: Branch[] = [];
  private thorns: Thorn[] = [];
  private flowers: Flower[] = [];
  private leaves: Leaf[] = [];

  private defaultSections: number;
  private defaultGrid: number;
  private branchSpeed: number;
  private spawnRates: BranchSpawnRates;
  private leafScale: number;
  private flowerScale: number;
  private thornScale: number;
  private maxPerBranch: {
    branch: number;
    thorn: number;
    flower: number;
    leaf: number;
  };

  private flowerColors: FlowerColors = {
    outer: "#F2B880",
    inner: "#E57373",
  };

  private rafId: number | null = null;
  private destroyed = false;

  constructor(opts: EngineOptions) {
    this.groups = {
      branchGroup: opts.branchGroup,
      thornGroup: opts.thornGroup,
      leafGroup: opts.leafGroup,
      flowerGroup: opts.flowerGroup,
    };
    this.defaultSections = opts.sections ?? 10;
    this.defaultGrid = opts.grid ?? 25;
    this.branchSpeed = opts.branchSpeed ?? 0.4;
    this.spawnRates = {
      branch: opts.spawnRates?.branch ?? 0.02,
      thorn: opts.spawnRates?.thorn ?? 0.1,
      flower: opts.spawnRates?.flower ?? 0.2,
      leaf: opts.spawnRates?.leaf ?? 0.4,
    };
    this.leafScale = opts.leafScale ?? 1;
    this.flowerScale = opts.flowerScale ?? 1;
    this.thornScale = opts.thornScale ?? 1;
    this.maxPerBranch = {
      branch: opts.maxPerBranch?.branch ?? Infinity,
      thorn: opts.maxPerBranch?.thorn ?? Infinity,
      flower: opts.maxPerBranch?.flower ?? Infinity,
      leaf: opts.maxPerBranch?.leaf ?? Infinity,
    };

    this.tick();
  }

  public grow(position: Position, setColors: boolean = true) {
    if (this.destroyed) return;
    if (setColors) {
      this.flowerColors = {
        outer: this.randomFlowerColor(),
        inner: this.randomFlowerColor(),
      };
    }
    this.startBranch(this.defaultSections, position, false);
  }

  public growFromAnchors(anchors: Anchor[]) {
    if (this.destroyed) return;
    this.flowerColors = {
      outer: this.randomFlowerColor(),
      inner: this.randomFlowerColor(),
    };
    anchors.forEach((a) =>
      this.startBranch(
        this.defaultSections,
        a.position,
        false,
        a.directionX,
        a.directionY,
      ),
    );
  }

  public growAlongPaths(paths: PathSpec[]) {
    if (this.destroyed) return;
    this.flowerColors = {
      outer: this.randomFlowerColor(),
      inner: this.randomFlowerColor(),
    };
    paths.forEach((p) =>
      this.startBranch(
        p.sections ?? this.defaultSections,
        p.start,
        false,
        undefined,
        undefined,
        p.d,
      ),
    );
  }

  public clear() {
    this.branches.forEach((b) => b.clear());
    this.thorns.forEach((t) => t.clear());
    this.flowers.forEach((f) => f.clear());
    this.leaves.forEach((l) => l.clear());

    // Kill any in-flight tweens targeting nodes we just removed.
    gsap.globalTimeline.getChildren(true, true, true).forEach((t) => t.kill());

    this.branches = [];
    this.thorns = [];
    this.flowers = [];
    this.leaves = [];
  }

  public destroy() {
    this.destroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.clear();
  }

  private startBranch(
    sections: number,
    position: Position,
    setColors: boolean = false,
    forceDx?: number,
    forceDy?: number,
    setPath?: string,
  ) {
    if (setColors) {
      this.flowerColors = {
        outer: this.randomFlowerColor(),
        inner: this.randomFlowerColor(),
      };
    }

    let dx: number;
    let dy: number;
    if (forceDx !== undefined || forceDy !== undefined) {
      dx = forceDx ?? 0;
      dy = forceDy ?? 0;
      if (dx === 0 && dy === 0) {
        dx = Math.random() > 0.5 ? 1 : -1;
      }
    } else {
      dx = Math.random();
      if (dx > 0.5) dx = dx > 0.75 ? 1 : -1;
      else dx = 0;
      dy = 0;
      if (dx === 0) dx = Math.random() > 0.5 ? 1 : -1;
    }

    const settings: BranchSettings = {
      x: position.x,
      y: position.y,
      directionX: dx,
      directionY: dy,
      sections,
    };

    const placeBehind =
      this.branches.length > 1
        ? this.branches[this.branches.length - 2]
        : null;

    const grid =
      this.defaultGrid / 2 + Math.random() * (this.defaultGrid / 2);

    const newBranch = new Branch(
      this.groups.branchGroup,
      settings,
      grid,
      placeBehind,
      setPath ?? null,
      this.branchSpeed,
      this.spawnRates,
    );

    newBranch.branchOut
      .pipe(debounceTime(200), take(this.maxPerBranch.branch))
      .subscribe((out: Out) =>
        this.startBranch(out.sections ?? sections, out.position),
      );
    newBranch.thornOut
      .pipe(debounceTime(100), take(this.maxPerBranch.thorn))
      .subscribe((out: Out) => {
        this.thorns.push(
          new Thorn(
            this.groups.thornGroup,
            out.position,
            (out.width ?? 4) * this.thornScale,
          ),
        );
      });
    newBranch.flowerOut
      .pipe(debounceTime(300), take(this.maxPerBranch.flower))
      .subscribe((out: Out) => {
        this.flowers.push(
          new Flower(
            this.groups.flowerGroup,
            out.position,
            (out.width ?? 4) * this.flowerScale,
            this.flowerColors,
          ),
        );
      });
    newBranch.leafOut
      .pipe(debounceTime(50), take(this.maxPerBranch.leaf))
      .subscribe((out: Out) => {
        this.leaves.push(
          new Leaf(
            this.groups.leafGroup,
            out.position,
            (out.width ?? 4) * this.leafScale,
          ),
        );
      });

    this.branches.push(newBranch);
  }

  private tick = () => {
    if (this.destroyed) return;
    for (let i = this.branches.length - 1; i >= 0; i--) {
      if (this.branches[i].state !== BranchState.ended) {
        this.branches[i].update();
      }
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  private randomFlowerColor(): string {
    const offset = Math.round(Math.random() * 100);
    const r = Math.sin(0.3 * offset) * 100 + 155;
    const g = Math.sin(0.3 * offset + 2) * 100 + 155;
    const b = Math.sin(0.3 * offset + 4) * 100 + 155;
    return "#" + this.hex(r) + this.hex(g) + this.hex(b);
  }

  private hex(c: number): string {
    const h = Math.round(c).toString(16);
    return h.length === 1 ? "0" + h : h;
  }
}
