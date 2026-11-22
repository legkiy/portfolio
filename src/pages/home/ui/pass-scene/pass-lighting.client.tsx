'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { AdditiveBlending, SRGBColorSpace } from 'three';

function drawGlow(center: string, fade: string) {
  const canvas = document.createElement('canvas');
  const middle = 64;
  canvas.width = canvas.height = middle * 2;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const gradient = context.createRadialGradient(middle, middle, 0, middle, middle, middle);
  gradient.addColorStop(0, center);
  gradient.addColorStop(0.45, fade);
  gradient.addColorStop(1, 'transparent');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

export function PassLighting() {
  const [glows, setGlows] = useState<{
    blue: HTMLCanvasElement;
    violet: HTMLCanvasElement;
    palette: string;
  } | null>(null);

  useEffect(() => {
    let frame = 0;
    let palette = '';

    function readBodyGradient() {
      frame = 0;
      const style = getComputedStyle(document.body);
      const blue = style.getPropertyValue('--blue-glow').trim();
      const blueFade = style.getPropertyValue('--blue-glow-fade').trim();
      const violet = style.getPropertyValue('--violet-glow').trim();
      const violetFade = style.getPropertyValue('--violet-glow-fade').trim();
      const nextPalette = [blue, blueFade, violet, violetFade].join('|');

      if (!blue || !blueFade || !violet || !violetFade || nextPalette === palette) return;

      const blueGlow = drawGlow(blue, blueFade);
      const violetGlow = drawGlow(violet, violetFade);
      if (blueGlow && violetGlow) {
        palette = nextPalette;
        setGlows({ blue: blueGlow, violet: violetGlow, palette });
      }
    }

    function scheduleRead() {
      if (!frame) frame = requestAnimationFrame(readBodyGradient);
    }

    const observer = new MutationObserver(scheduleRead);
    const attributes = { attributeFilter: ['class', 'style'] };
    observer.observe(document.documentElement, attributes);
    observer.observe(document.body, attributes);
    scheduleRead();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Environment key={glows?.palette} resolution={128}>
      <Lightformer
        form="rect"
        position={[1.85, 1.65, 3.25]}
        scale={[0.65, 2.45]}
        intensity={2.8}
      />
      {glows && (
        <>
          <Lightformer position={[-2.1, 0.8, 2.8]} scale={[5.8, 4.6]}>
            <meshBasicMaterial
              blending={AdditiveBlending}
              color={[6, 6, 6]}
              depthWrite={false}
              toneMapped={false}
              transparent
            >
              <canvasTexture attach="map" args={[glows.blue]} colorSpace={SRGBColorSpace} />
            </meshBasicMaterial>
          </Lightformer>
          <Lightformer position={[2.25, 0.85, 2.65]} scale={[5.8, 4.6]}>
            <meshBasicMaterial
              blending={AdditiveBlending}
              color={[6, 6, 6]}
              depthWrite={false}
              toneMapped={false}
              transparent
            >
              <canvasTexture attach="map" args={[glows.violet]} colorSpace={SRGBColorSpace} />
            </meshBasicMaterial>
          </Lightformer>
        </>
      )}
    </Environment>
  );
}
