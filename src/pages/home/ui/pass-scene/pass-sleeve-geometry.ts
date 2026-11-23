import { BoxGeometry, MathUtils, Vector3 } from 'three';

const width = 1.59;
const height = 1.99;
const depth = 0.06;
const cornerRadius = 0.08;
const edgeRadius = 0.01;
const halfDepth = depth / 2;

const widthSegments = 80;
const heightSegments = 100;
const frontWeight = 0.82;
const backWeight = 1 - frontWeight;

// The bottom corner buckles into a fork. The upper edge has a separate, hooked fold.
const folds = [
  {
    x: -0.55,
    y: -0.7,
    angle: 1.02,
    length: 0.66,
    width: 0.031,
    bend: 0.064,
    kink: 0.02,
    depth: 0.012,
    lip: 0.006,
  },
  {
    x: -0.58,
    y: -0.78,
    angle: 0.44,
    length: 0.37,
    width: 0.022,
    bend: -0.052,
    kink: 0.007,
    depth: 0.007,
    lip: 0.004,
  },
  {
    x: -0.42,
    y: -0.86,
    angle: 0.17,
    length: 0.32,
    width: 0.048,
    bend: 0.038,
    kink: -0.013,
    depth: 0.004,
    lip: 0.002,
  },
  {
    x: 0.53,
    y: 0.73,
    angle: -0.84,
    length: 0.48,
    width: 0.039,
    bend: -0.075,
    kink: 0.026,
    depth: 0.011,
    lip: 0.005,
  },
  {
    x: 0.64,
    y: 0.55,
    angle: -1.34,
    length: 0.27,
    width: 0.025,
    bend: 0.036,
    kink: -0.009,
    depth: 0.005,
    lip: 0.003,
  },
].map((fold) => ({
  ...fold,
  sin: Math.sin(fold.angle),
  cos: Math.cos(fold.angle),
}));

function deformationAt(x: number, y: number) {
  // A broad sag under the fork and a shallower ripple on the far edge.
  const sagX = (x + 0.49 + 0.13 * (y + 0.67)) / 0.19;
  const sagY = (y + 0.67) / 0.14;
  const rippleX = (x - 0.68 + 0.18 * (y + 0.2)) / 0.082;
  const rippleY = (y + 0.2) / 0.31;
  let offset =
    0.004 * Math.exp(-sagX * sagX - sagY * sagY) -
    0.0025 * Math.exp(-rippleX * rippleX - rippleY * rippleY);

  for (const fold of folds) {
    const deltaX = x - fold.x;
    const deltaY = y - fold.y;
    const along = (deltaX * fold.cos + deltaY * fold.sin) / fold.length + 0.5;
    if (along <= 0 || along >= 1) continue;

    const centered = 2 * along - 1;
    const profile = Math.sin(Math.PI * along);
    const curve =
      fold.bend * (centered * centered - 0.25) +
      fold.kink * Math.sin(1.8 * Math.PI * centered) * profile;
    const taper = fold.width * (0.4 + 0.77 * along + 0.24 * profile);
    const across = (-deltaX * fold.sin + deltaY * fold.cos - curve) / taper;
    const shoulder = (across - 1.12 - 0.34 * along) / 1.28;
    const core = across / (across < 0 ? 1.25 : 0.78);

    offset +=
      profile *
      profile *
      (fold.depth * Math.exp(-core * core) -
        fold.lip * Math.exp(-shoulder * shoulder));
  }

  return offset;
}

// Reserve several rows of vertices for the narrow bevel on each axis.
function roundedAxis(
  value: number,
  halfSize: number,
  radius: number,
  bevelShare: number,
) {
  const absolute = Math.abs(value);
  const inner = halfSize - radius;
  const bevelStart = 1 - bevelShare;
  const distance =
    absolute <= bevelStart
      ? (inner * absolute) / bevelStart
      : inner + (radius * (absolute - bevelStart)) / bevelShare;

  return Math.sign(value) * distance;
}

export class PassSleeveGeometry extends BoxGeometry {
  constructor() {
    super(2, 2, 2, widthSegments, heightSegments, 8);
    this.clearGroups();

    const positions = this.getAttribute('position');
    const normals = this.getAttribute('normal');
    const point = new Vector3();
    const inner = new Vector3();
    const normal = new Vector3();
    const radii = new Vector3(cornerRadius, cornerRadius, edgeRadius);
    const innerX = width / 2 - cornerRadius;
    const innerY = height / 2 - cornerRadius;
    const innerZ = halfDepth - edgeRadius;
    const step = 0.001;

    for (let index = 0; index < positions.count; index++) {
      point.set(
        roundedAxis(
          positions.getX(index),
          width / 2,
          cornerRadius,
          8 / widthSegments,
        ),
        roundedAxis(
          positions.getY(index),
          height / 2,
          cornerRadius,
          8 / heightSegments,
        ),
        roundedAxis(positions.getZ(index), halfDepth, edgeRadius, 3 / 4),
      );
      inner.set(
        MathUtils.clamp(point.x, -innerX, innerX),
        MathUtils.clamp(point.y, -innerY, innerY),
        MathUtils.clamp(point.z, -innerZ, innerZ),
      );
      // Project onto an ellipsoid so the corners can round without thickening the sleeve.
      normal.subVectors(point, inner).divide(radii).normalize();
      point.copy(normal).multiply(radii).add(inner);
      normal.divide(radii).normalize();

      const { x, y, z } = point;
      const deformation = deformationAt(x, y);
      const slopeX =
        (deformationAt(x + step, y) - deformationAt(x - step, y)) / (2 * step);
      const slopeY =
        (deformationAt(x, y + step) - deformationAt(x, y - step)) / (2 * step);

      // The back follows the deformation more gently than the front.
      const depthFraction = backWeight + (frontWeight * z) / halfDepth;
      const depthScale = 1 - (frontWeight * deformation) / halfDepth;

      // Transform the rounded normal by the inverse transpose of the dent deformation.
      const normalZ = normal.z / depthScale;
      normal
        .set(
          normal.x + normalZ * depthFraction * slopeX,
          normal.y + normalZ * depthFraction * slopeY,
          normalZ,
        )
        .normalize();

      positions.setXYZ(index, x, y, z - depthFraction * deformation);
      normals.setXYZ(index, normal.x, normal.y, normal.z);
    }

    this.computeBoundingBox();
    this.computeBoundingSphere();
  }
}
