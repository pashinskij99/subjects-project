import React, { useRef } from 'react';
import { BoxComponent } from '../../BoxComponent/BoxComponent';
import { isMobile } from "../../../scripts/utils";

import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from '../../Title/Title.styles';
import { useEffect } from 'react';

const Slide3 = ({ index }) => {
    const refWrapper = useRef(null);
    const modelName = 'box.fbx'
    // const modelName = 'box_30kpoly.fbx'
    const cameraPosition = [60, 75, -500];
    const modelPosition = [0, 125, 0];
    const lightPosition = [100, 30, 100];
    const modelColor = 0x84c8ed;
    const clothColor = 0xcde6f2;
    const rotationModifier = { x: 0, y: 1.3, z: 0 };
    const cameraModifier = {
        lon: isMobile ? 650 : 150,
        lat: 1100,
    };
    const scrollListener = () => {
        const element = document.querySelector('#title-s3');
        const position = element.getBoundingClientRect();

        // checking whether fully visible
        if(element && position.top >= 0 && position.bottom <= window.innerHeight) {
            window.removeEventListener('scroll', scrollListener, false);
            element.style.opacity = 1
        }
    }

    React.useEffect(()=>{
        window.addEventListener('scroll', scrollListener, false);
    }, [])

    
    return (
        <div
            className="slide-3 slide-i section1"
            data_id={3}
            ref={refWrapper}
        >
            <div className="anchor_slide-wrapper" id="slide-3">
                <BoxComponent
                  isLanding={false}
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
                <SectionTitle
                    type="dark"
                    isMobile={isMobile}
                    className="main-title title3"
                    id="title-s3"
                    >
                    <TitleHeader>INTRODUCING</TitleHeader>
                    <span>An Art Project</span>
                    <span>
                        By Baby Teeth
                    </span>
                    <span>& Sutter Systems</span>
                </SectionTitle>
                
            </div>
        </div>
    );
};

export default Slide3;
