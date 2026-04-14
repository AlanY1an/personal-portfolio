// Ported from ste-vg/plant-drawer (ISC).

import { gsap } from "gsap";
import { Subject } from "rxjs";
import {
  BranchSettings,
  BranchState,
  Out,
} from "./types";

interface BranchSet {
  path: SVGPathElement;
  settings: BranchSettings;
}

export interface BranchSpawnRates {
  branch: number;
  thorn: number;
  flower: number;
  leaf: number;
}

export class Branch {
  private grid: number;
  private stage: SVGGElement;
  public branches: BranchSet[] = [];
  public state: BranchState = BranchState.ready;
  private placeBehind: Branch | null;
  private speed: number;
  private spawnRates: BranchSpawnRates;

  public branchOut: Subject<Out> = new Subject();
  public thornOut: Subject<Out> = new Subject();
  public flowerOut: Subject<Out> = new Subject();
  public leafOut: Subject<Out> = new Subject();

  constructor(
    stage: SVGGElement,
    settings: BranchSettings,
    grid: number,
    placeBehind: Branch | null = null,
    setPath: string | null = null,
    speed: number = 0.4,
    spawnRates: BranchSpawnRates = {
      branch: 0.02,
      thorn: 0.1,
      flower: 0.2,
      leaf: 0.4,
    },
  ) {
    this.grid = grid;
    this.stage = stage;
    this.placeBehind = placeBehind;
    this.speed = speed;
    this.spawnRates = spawnRates;

    settings.width = 2;
    settings.opacity = 1;

    this.state = BranchState.animating;
    const path = setPath ? setPath : this.createLine(settings);
    const branchCount = 2;
    for (let i = 0; i < branchCount; i++) {
      this.createSqwig(
        i,
        branchCount,
        path,
        JSON.parse(JSON.stringify(settings)) as BranchSettings,
      );
    }
  }

  private createSqwig(
    index: number,
    total: number,
    path: string,
    settings: BranchSettings,
  ) {
    const branch = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    branch.setAttribute("d", path);
    branch.style.fill = "none";
    branch.style.stroke = this.getColor(index);
    branch.style.strokeLinecap = "round";

    settings.length = branch.getTotalLength();
    settings.progress = settings.length;

    branch.style.strokeDasharray = `${settings.length}, ${settings.length}`;
    branch.style.strokeDashoffset = `${settings.length}`;

    this.branches.push({ path: branch, settings });
    if (!this.placeBehind) {
      this.stage.appendChild(branch);
    } else if (this.placeBehind.branches.length > 0) {
      this.stage.insertBefore(branch, this.placeBehind.branches[0].path);
    } else {
      this.stage.appendChild(branch);
    }

    const widthTarget = settings.sections * 0.6;

    gsap.set(branch, { x: -index * 2, y: -index * 2 });

    const rates = this.spawnRates;
    const cBranch = rates.branch;
    const cThorn = cBranch + rates.thorn;
    const cFlower = cThorn + rates.flower;
    const cLeaf = cFlower + rates.leaf;

    gsap.to(settings, {
      duration: settings.sections * this.speed,
      progress: 0,
      width: widthTarget,
      ease: "power1.out",
      delay: index * (settings.sections * 0.001),
      onUpdate: () => {
        if (index === 0 && settings.sections > 4) {
          const choice = Math.random();
          const length = (settings.length ?? 0) - (settings.progress ?? 0);
          const pos = branch.getPointAtLength(length);

          let sec =
            Math.ceil(
              ((settings.progress ?? 0) / (settings.length ?? 1)) *
                settings.sections,
            ) - 2;
          if (sec < 4) sec = 4;

          const out: Out = {
            position: { x: pos.x, y: pos.y },
            width: widthTarget,
            sections: sec,
          };

          if (choice < cBranch) this.branchOut.next(out);
          else if (choice < cThorn) this.thornOut.next(out);
          else if (choice < cFlower) this.flowerOut.next(out);
          else if (choice < cLeaf) this.leafOut.next(out);
        }
      },
      onComplete: () => {
        if (index === total - 1) this.state = BranchState.ended;
      },
    });
  }

  public update() {
    this.branches.forEach((set: BranchSet) => {
      set.path.style.strokeDashoffset = `${set.settings.progress}`;
      set.path.style.strokeWidth = `${set.settings.width}px`;
    });
  }

  private createLine(settings: BranchSettings): string {
    let x = settings.x;
    let y = settings.y;
    let dx = settings.directionX ?? 0;
    let dy = settings.directionY ?? 0;
    const path: string[] = ["M", "" + x, "" + y];

    const steps = settings.sections;
    let step = 0;
    const getNewDirection = (
      direction: "x" | "y",
      goAnywhere: boolean,
    ): number => {
      const key = direction === "x" ? "directionX" : "directionY";
      const current = settings[key] ?? 0;
      if (!goAnywhere && current !== 0) return current;
      return Math.random() < 0.5 ? -1 : 1;
    };

    if (steps * 2 > step) path.push("Q");

    while (step < steps * 2) {
      step++;
      const stepUp = this.stepUp(step);
      x += dx * stepUp * this.grid;
      y += dy * stepUp * this.grid;
      if (step !== 1) path.push(",");
      path.push("" + x);
      path.push("" + y);

      if (step % 2 !== 0) {
        dx = dx === 0 ? getNewDirection("x", step > 8) : 0;
        dy = dy === 0 ? getNewDirection("y", step > 8) : 0;
      }
    }

    return path.join(" ");
  }

  private stepUp(step: number): number {
    const r = Math.random() * 10;
    return step / (10 + r);
  }

  public clear() {
    this.branchOut.complete();
    this.thornOut.complete();
    this.leafOut.complete();
    this.flowerOut.complete();
    this.branches.forEach((set: BranchSet) => set.path.remove());
    this.branches = [];
  }

  private getColor(index: number): string {
    const base = ["#646F4B"];
    const greens = ["#6FCAB1"];
    const chooseFrom = index === 0 ? base : greens;
    return chooseFrom[Math.floor(Math.random() * chooseFrom.length)];
  }
}
