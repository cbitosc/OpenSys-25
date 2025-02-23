import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const AnimatedGlobe = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    let sketch = new p5((p: p5) => {
      const radius = 150;
      const incr = 6;
      const particles: Particle[] = [];
      const particleCount = 200;
      let angle = 0;

      class Particle {
        id: number;
        r: number;
        phi: number;
        theta: number;
        radius: number;
        color: p5.Color;
        deltaPhi: number;
        deltaTheta: number;
        heading: number;

        constructor(d: number, id: number) {
          this.id = id;
          this.r = d;
          this.phi = p.random(0, 360);
          this.theta = p.randomGaussian(90, 30);
          this.radius = 5;
          this.color = p.color(255, 215, 0);
          this.deltaPhi = p.random(-0.5, 0.5);
          this.deltaTheta = p.random(-0.1, 0.1);
          this.heading =
            (Math.asin(Math.sin(this.deltaTheta) / Math.sin(this.deltaPhi)) * 180) /
            Math.PI;
        }

        update() {
          this.theta = (this.theta + this.deltaTheta) % 360;
          this.phi = (this.phi + this.deltaPhi) % 360;
        }

        render() {
          p.push();
          p.stroke(this.color);
          p.noFill();
          p.strokeWeight(1);
          const x = this.r * p.sin(this.theta) * p.sin(this.phi);
          const y = this.r * p.cos(this.theta);
          const z = this.r * p.sin(this.theta) * p.cos(this.phi);
          p.translate(x, y, z);
          p.rotateY(this.phi);
          p.rotateX(this.theta + 90);
          p.rotateZ(this.deltaPhi < 0 ? this.heading + 90 : this.heading - 90);
          p.beginShape();
          const l = Math.cos(Math.PI * 0.25) * this.radius;
          p.vertex(-l, -l, 0);
          p.vertex(l, -l, 0);
          p.vertex(0, 2 * this.radius, 0);
          p.endShape(p.CLOSE);
          p.pop();
        }
      }

      function drawGlobe() {
        // Longitudes
        for (let theta = 0; theta < 180; theta += incr) {
          p.beginShape();
          for (let phi = 0; phi < 360; phi += incr) {
            const x = radius * p.sin(phi) * p.sin(theta);
            const y = radius * p.cos(phi);
            const z = radius * p.sin(phi) * p.cos(theta);
            p.vertex(x, y, z);
          }
          p.endShape(p.CLOSE);
        }

        // Latitudes
        for (let theta = 0; theta < 180; theta += incr) {
          p.beginShape();
          for (let phi = 0; phi < 360; phi += incr) {
            const x = radius * p.sin(theta) * p.sin(phi);
            const y = radius * p.cos(theta);
            const z = radius * p.sin(theta) * p.cos(phi);
            p.vertex(x, y, z);
          }
          p.endShape(p.CLOSE);
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(700, 600, p.WEBGL);
        canvas.parent(sketchRef.current!);
        p.angleMode(p.DEGREES);
        p.imageMode(p.CENTER);
        p.orbitControl(4, 4, 0);
        
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(radius, i));
        }
      };

      p.draw = () => {
        p.clear();
        p.camera(0, 0, 600, 0, 0, 0, 0, 1, 0);
        p.stroke(255, 255, 255, 20);
        p.noFill();
        p.strokeWeight(1);
        p.rotateY(angle);

        for (let i = 0; i < particleCount; i++) {
          particles[i].update();
          particles[i].render();
        }

        drawGlobe();
        angle = (angle - 0.125) % 360;
      };
    });

    return () => {
      sketch.remove();
    };
  }, []);

  const styles = {
    '--clr-base': 'rgb(69 24 84)',
    '--clr-light': 'rgb(192 124 220)',
    '--clr-dark': 'rgb(18 1 24)',
    margin: 0,
    display: 'flex',
    justifyContent: "end"
  } as React.CSSProperties;

  return (
    <div style={styles}>
      <div ref={sketchRef}></div>
    </div>
  );
};

export default AnimatedGlobe;