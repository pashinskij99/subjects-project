import React from 'react';
import { LogoComponent } from '../../LogoComponent/LogoComponent';
import bgLogo from '../../../assets/images/bg/bg-logo.png';
import { BGContainer } from './Slide7.styles';
import { isMobile } from '../../../scripts/utils';
import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from '../../Title/Title.styles';

const Slide7 = ({ index }) => {
    const modelName = 'logo.fbx';
    const cameraPosition = [400, 0, 0];
    const modelPosition = [0, 0, 0];
    const modelColor = 0xffffff;
    const rotationModifier = { x: 0, y: isMobile ? 14. : 2.18, z: 0 };

    const scrollListener = () => {
        const element = document.querySelector('#title-s7');
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
            className="slide-7 slide-i section4"
            data_id={7}
        >
            <div className="container">
                <div className="anchor_slide-wrapper" id="slide-7">
                    <LogoComponent
                        modelName={modelName}
                        slideIndex={index}
                        cameraPosition={cameraPosition}
                        modelPosition={modelPosition}
                        modelColor={modelColor}
                        rotationModifier={rotationModifier}
                    />
                </div>
                <BGContainer>
                    <img src={bgLogo} />
                </BGContainer>
                <SectionTitle
                    type="dark"
                    isMobile={isMobile}
                    className="main-title title7"
                    id="title-s7"
                >
                    <TitleHeader>ALLOWLIST</TitleHeader>
                    <TitleSection7>Opening</TitleSection7>
                    <TitleSection7>Soon</TitleSection7>
                </SectionTitle>
            </div>
        </div>
    );
};

export default Slide7;
