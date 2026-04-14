"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Anchor,
  EngineOptions,
  PathSpec,
  PlantEngine,
} from "./engine";
import { BranchSpawnRates } from "./branch";
import { Position } from "./types";

export type { Anchor, PathSpec };

export interface PlantDrawerHandle {
  grow: (position: Position) => void;
  growFromAnchors: (anchors: Anchor[]) => void;
  growAlongPaths: (paths: PathSpec[]) => void;
  clear: () => void;
}

interface PlantDrawerProps {
  width: number;
  height: number;
  sections?: number;
  grid?: number;
  branchSpeed?: number;
  spawnRates?: Partial<BranchSpawnRates>;
  leafScale?: number;
  flowerScale?: number;
  thornScale?: number;
  maxPerBranch?: EngineOptions["maxPerBranch"];
  className?: string;
}

const PlantDrawer = forwardRef<PlantDrawerHandle, PlantDrawerProps>(
  function PlantDrawer(
    {
      width,
      height,
      sections,
      grid,
      branchSpeed,
      spawnRates,
      leafScale,
      flowerScale,
      thornScale,
      maxPerBranch,
      className,
    },
    ref,
  ) {
    const branchGroupRef = useRef<SVGGElement>(null);
    const thornGroupRef = useRef<SVGGElement>(null);
    const leafGroupRef = useRef<SVGGElement>(null);
    const flowerGroupRef = useRef<SVGGElement>(null);
    const engineRef = useRef<PlantEngine | null>(null);

    useEffect(() => {
      if (
        !branchGroupRef.current ||
        !thornGroupRef.current ||
        !leafGroupRef.current ||
        !flowerGroupRef.current
      ) {
        return;
      }
      const engine = new PlantEngine({
        branchGroup: branchGroupRef.current,
        thornGroup: thornGroupRef.current,
        leafGroup: leafGroupRef.current,
        flowerGroup: flowerGroupRef.current,
        sections,
        grid,
        branchSpeed,
        spawnRates,
        leafScale,
        flowerScale,
        thornScale,
        maxPerBranch,
      });
      engineRef.current = engine;
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }, [
      sections,
      grid,
      branchSpeed,
      spawnRates,
      leafScale,
      flowerScale,
      thornScale,
      maxPerBranch,
    ]);

    useImperativeHandle(ref, () => ({
      grow: (position) => engineRef.current?.grow(position),
      growFromAnchors: (anchors) =>
        engineRef.current?.growFromAnchors(anchors),
      growAlongPaths: (paths) =>
        engineRef.current?.growAlongPaths(paths),
      clear: () => engineRef.current?.clear(),
    }));

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g ref={branchGroupRef} />
        <g ref={thornGroupRef} />
        <g ref={leafGroupRef} />
        <g ref={flowerGroupRef} />
      </svg>
    );
  },
);

export default PlantDrawer;
