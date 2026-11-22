import { ShaderChunk } from 'three';
import type { MeshPhysicalMaterial } from 'three';

const transmission = ShaderChunk.transmission_pars_fragment.replace(
  'vec3 attenuatedColor = transmittance * transmittedLight.rgb;',
  /* glsl */ `
    // Three clears its transmission target to premultiplied half-alpha white
    // when the WebGL canvas is transparent. Recover the card's coverage and color.
    float cardCoverage = clamp(2.0 * transmittedLight.a - 1.0, 0.0, 1.0);
    vec3 matte = vec3(0.5 * (1.0 - cardCoverage));
    transmittedLight.rgb = max(transmittedLight.rgb - matte, vec3(0.0));
    transmittedLight.a = cardCoverage;
    vec3 attenuatedColor = transmittance * transmittedLight.rgb;
  `,
);

export const compileClearSleeve: MeshPhysicalMaterial['onBeforeCompile'] = (shader) => {
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <transmission_pars_fragment>', transmission)
    .replace('#include <opaque_fragment>', /* glsl */ `
      #ifdef USE_TRANSMISSION
        float grazing = pow(1.0 - clamp(dot(normal, geometryViewDir), 0.0, 1.0), 5.0);
        float reflection = max(totalSpecular.r, max(totalSpecular.g, totalSpecular.b));
        float filmAlpha = clamp(max(0.02 + 0.23 * grazing, reflection), 0.02, 0.9);
        float alpha = mix(filmAlpha, 1.0, material.transmissionAlpha);

        // Tone-map straight color before Three premultiplies it for the page compositor.
        gl_FragColor = vec4(outgoingLight / alpha, alpha);
      #else
        #include <opaque_fragment>
      #endif
    `);
};
