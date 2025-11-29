
export type ParticleType = 'coin' | 'mouse';



export interface Particle {

  x: number;

  y: number;

  vx: number;

  vy: number;

  size: number;

  color: string;

  rotation: number;

  rotationSpeed: number;

  life: number;

  decay: number;

  type: ParticleType;

  bounceCount: number;

}

