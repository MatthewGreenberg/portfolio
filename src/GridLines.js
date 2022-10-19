import React, { useMemo } from "react";
import * as THREE from "three";

const GridLines = () => {
  const processedPositions = useMemo(() => {
    const gridSizeX = 340;
    const gridSizeZ = 300;
    const gridUnit = 0.3;
    const newVerts = new Float32Array((gridSizeX + 1) * 2 * 4 * 3);
    let newVertexPos = 0;

    // no middle points, just bottom and top
    for (let x = 0; x <= gridSizeX; x += gridUnit) {
      for (let z = 0; z <= gridSizeZ; z += gridSizeZ) {
        newVerts[newVertexPos++] = x;
        newVerts[newVertexPos++] = -0.01;
        newVerts[newVertexPos++] = z;
      }
    }

    for (let z = 0; z <= gridSizeZ; z += gridUnit) {
      for (let x = 0; x <= gridSizeX; x += gridSizeX) {
        newVerts[newVertexPos++] = x;
        newVerts[newVertexPos++] = -0.01;
        newVerts[newVertexPos++] = z;
      }
    }

    return newVerts;
  }, []);

  return (
    <>
      <lineSegments position={[0, 0, 0]} rotation={[0, Math.PI / -4, 0]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={processedPositions.length / 3}
            array={processedPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="rgb(180, 180, 180)"
          blending={THREE.CustomBlending}
          blendEquation={THREE.ReverseSubtractEquation}
          blendSrc={THREE.OneMinusDstColorFactor}
          blendDst={THREE.DstAlphaFactor}
        />
      </lineSegments>
    </>
  );
};

export default GridLines;
