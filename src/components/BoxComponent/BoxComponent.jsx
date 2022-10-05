import { Scene } from '../../webgl/scenes/boxScene';
import React, { useEffect, useRef } from 'react';

export const BoxComponent = ({
    isLanding,
    modelName,
    slideIndex,
    cameraPosition,
    modelPosition,
    lightPosition,
    modelColor,
    clothColor,
    rotationModifier,
    cameraModifier,
  }) => {
    const _mount = useRef(null);
    useEffect(() => {
      if (_mount.current) {
        new Scene(
          _mount.current,
          slideIndex,
          modelName,
          cameraPosition,
          modelPosition,
          lightPosition,
          modelColor,
          clothColor,
          rotationModifier,
          cameraModifier,
          isLanding
        );
      }
    if (_mount.current.children[1]) _mount.current.children[1].remove();
  }, [_mount]);

  return (
    <div
      className="openglWrapper"
      style={isLanding ? { zIndex: 200 } : { zIndex: 1 }}
    >
      <div ref={_mount} />
    </div>
  );
};
