import React  from 'react';
import { SubjectsComponent } from '../SubjectsComponent/SubjectsComponent';
import { isMobile } from "../../scripts/utils";
import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from '../Title/Title.styles';

// let isMobileUtils = isMobile

const Slide6 = ({ index }) => {
    const modelName = 'statue.glb';
    const cameraPosition = [60, 75, -90];
    const modelPosition = [0, -30, 0];
    const lightPosition = [100, 30, 100];
    const modelColor = 0x84c8ed;
    const clothColor = 0xcde6f2;
    const rotationModifier = { x: 0, y: 3.6, z: 0 };
    const cameraModifier = {
        lon: 150,
        lat: 100,
    };

    const scrollListener = () => {
        const element = document.querySelector('#title-s6');
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
            className="slide-6 slide-i section3"
            data_id={6}
        >
            <div className="container">
                <div className="anchor_slide-wrapper" id="slide-6">

                    <SectionTitle
                            type="dark"
                            isMobile={isMobile}
                            className="main-title title6"
                            id='title-s6'
                            style={{zIndex: 2}}
                        >
                        <TitleHeader>MINTING</TitleHeader>
                        <span>1st Mint: <span className="small-text">Free</span></span>
                        <span>2nd Mint (Optional): <span className="small-text">Paid</span></span>
                    </SectionTitle>
                    <SubjectsComponent
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
                </div>
            </div>
        </div>
    );
};

export default Slide6;
