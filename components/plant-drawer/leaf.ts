// Ported from ste-vg/plant-drawer (ISC).

import { gsap } from "gsap";
import { Position } from "./types";

export class Leaf {
  leaf: SVGPathElement;

  constructor(stage: SVGGElement, position: Position, size: number) {
    this.leaf = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    this.leaf.setAttribute("d", this.createLeafPath({ x: 0, y: 0 }, size));
    this.leaf.setAttribute("class", "leaf");
    this.leaf.style.fill = this.getColor();
    this.leaf.style.stroke = "none";

    const rotate = Math.random() * 360;
    const rotateGrow = Math.random() * 180 - 90;

    gsap.set(this.leaf, {
      scale: 0,
      x: position.x,
      y: position.y,
      rotation: rotate,
      transformOrigin: "0px 0px",
    });
    gsap.to(this.leaf, { duration: 4, scale: 1 });
    gsap.to(this.leaf, {
      duration: 6,
      rotation: rotate + rotateGrow,
      ease: "elastic.out",
    });

    stage.appendChild(this.leaf);
  }

  private createLeafPath(p: Position, size: number): string {
    const top = size * (3 + Math.random() * 2);
    const middle = size * (1 + Math.random());
    const width = size * (1.5 + Math.random() * 0.5);
    return `M ${p.x} ${p.y} Q ${p.x - width} ${p.y + middle}  ${p.x} ${p.y + top} Q ${p.x + width} ${p.y + middle} ${p.x} ${p.y} Z`;
  }

  private getColor(): string {
    const greens = ["#00A676", "#00976C", "#008861", "#007956"];
    return greens[Math.floor(Math.random() * greens.length)];
  }

  public clear() {
    this.leaf.remove();
  }
}
