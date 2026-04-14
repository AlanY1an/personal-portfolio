// Ported from ste-vg/plant-drawer (ISC).

import { gsap } from "gsap";
import { FlowerColors, Position } from "./types";

export class Flower {
  petals: SVGPathElement[] = [];

  constructor(
    stage: SVGGElement,
    position: Position,
    size: number,
    colors: FlowerColors,
  ) {
    // Outer petals
    let petalCount = 8;
    let p = petalCount;
    let rotateAmount = 360 / petalCount;
    const growRotation = Math.random() * 100 - 50;

    while (p > 0) {
      --p;
      const petal = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      petal.setAttribute("d", this.createPetalPath({ x: 0, y: 0 }, size));
      petal.setAttribute("class", "petal");
      petal.style.fill = colors.outer;
      petal.style.stroke = "none";

      this.petals.push(petal);
      const rotate = rotateAmount * p + Math.random() * 30;

      gsap.set(petal, {
        scale: 0,
        x: position.x,
        y: position.y,
        rotation: rotate,
        transformOrigin: "0px 0px",
      });
      const delay = Math.random();
      gsap.to(petal, { duration: 3, scale: 1, delay });
      gsap.to(petal, {
        duration: 6,
        rotation: "+=" + growRotation,
        delay,
        ease: "elastic.out",
      });

      stage.appendChild(petal);
    }

    // Inner petals
    petalCount = 6;
    p = petalCount;
    rotateAmount = 360 / petalCount;
    while (p > 0) {
      --p;
      const petal = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      petal.setAttribute("d", this.createPetalPath({ x: 0, y: 0 }, size / 2));
      petal.setAttribute("class", "petal");
      petal.style.fill = colors.inner;
      petal.style.stroke = "none";

      this.petals.push(petal);
      const rotate = rotateAmount * p + Math.random() * 30;

      gsap.set(petal, {
        scale: 0,
        x: position.x,
        y: position.y,
        rotation: rotate,
        transformOrigin: "0px 0px",
      });
      gsap.to(petal, {
        duration: 12,
        scale: 1,
        rotation: "+=" + growRotation,
        delay: 1 + Math.random(),
        ease: "elastic.out",
      });

      stage.appendChild(petal);
    }
  }

  private createPetalPath(p: Position, size: number): string {
    const top = size * 4;
    const middle = size * 1.8;
    const width = size;
    return `M ${p.x} ${p.y} Q ${p.x - width} ${p.y + middle}  ${p.x} ${p.y + top} Q ${p.x + width} ${p.y + middle} ${p.x} ${p.y} Z`;
  }

  public clear() {
    this.petals.forEach((petal: SVGPathElement) => petal.remove());
    this.petals = [];
  }
}
