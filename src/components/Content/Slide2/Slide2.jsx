import React from 'react';
import { BGContainer, BGImage } from './Slide2.styles';
import titleSection2 from '../../../assets/images/texts/Imagine.svg';
import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from '../../Title/Title.styles';
import { isMobile } from "../../../scripts/utils";

const Slide2 = ({ isMobile }) => {

    const scrollListener = () => {
        const element = document.querySelector('#title-s2');
        const position = element.getBoundingClientRect();
    
        // checking whether fully visible
        if(element && position.top >= 0 && position.bottom <= window.innerHeight) {
            window.removeEventListener('scroll', scrollListener, false);
            element.style.opacity = 1
        }
    }

    React.useEffect(()=>{
        window.addEventListener('scroll', scrollListener, false);
        console.log(isMobile)
    }, [isMobile])

    return (
        <div
            className="slide-2 slide-i section0"
            id="slide-2"
            data_id={2}
        >
            <BGContainer isMobile={isMobile}>
                <BGImage>
                    <SectionTitle
                        type="portrait"
                        isMobile={isMobile}
                        className="main-title title2"
                        id='title-s2'
                    >
                        <TitleSection2>
                            <img src={titleSection2} alt=""/>
                        </TitleSection2>
                    </SectionTitle>
                </BGImage>
            </BGContainer>
        </div>
    );
};

export default Slide2;
