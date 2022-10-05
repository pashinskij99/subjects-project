import { Scene } from '../../webgl/scenes/logoScene';
import React, { useEffect, useRef } from 'react';

export const LogoComponent = ({
    modelName,
    slideIndex,
    cameraPosition,
    modelPosition,
    modelColor,
    rotationModifier,
    translationModifier,
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
                modelColor,
                rotationModifier,
                translationModifier,
                cameraModifier
            );
        }
        if (_mount.current.children[1]) _mount.current.children[1].remove();
    }, [_mount]);

    return (
        <div className="openglWrapper openglWrapper--logo">
            <div ref={_mount} />
        </div>
    );
};
