import React from 'react';
import { SubjectsComponent } from '../../SubjectsComponent/SubjectsComponent';
import constants from '../../../scripts/constants';
import { ReactComponent as LogoSVG } from '../../../assets/images/svg/SubjectsLogotype.svg';
import bgLogo from '../../../assets/images/bg/bg-logo.png';
import { BackgroundContainer } from './SlideLanding.styles';

export const SlideLanding = ({ index, isMobile }) => {
    const defineCameraPosition = () => {
        if (isMobile) return [60, 100, -90];
        else return [60, 75, -90];
    };

    const modelName = 'statue.glb';
    const cameraPosition = defineCameraPosition();
    const modelPosition = [0, 0, 0];
    const lightPosition = [100, 30, 100];
    const modelColor = 0x84c8ed;
    const clothColor = 0xcde6f2;
    const rotationModifier = { x: 0, y: 0, z: 0 };
    const cameraModifier = {
        lon: 150,
        lat: 100,
    };

    return (
        <div className="slide-landing slide-i section3" data_id={6}>
            <div className="container">
                <div className="anchor_slide-wrapper" id="slide-landing">
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <img
                            src={bgLogo}
                            style={{
                                position: 'absolute',
                                top: 0,
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <BackgroundContainer>
                        <LogoSVG
                            style={{
                                fill: constants.COLOR_WHITE,
                                zIndex: 100,
                            }}
                        />
                    </BackgroundContainer>
                    <SubjectsComponent
                        isLanding={true}
                        modelName={modelName}
                        slideIndex={index}
                        cameraPosition={cameraPosition}
                        modelPosition={modelPosition}
                        lightPosition={lightPosition}
                        modelColor={modelColor}
                        clothColor={clothColor}
                        rotationModifier={rotationModifier}
                        cameraModifier={cameraModifier}
                    />
                </div>
            </div>
        </div>
    );
};
