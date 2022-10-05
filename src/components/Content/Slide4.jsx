import React from 'react';
import cows_img from '../../assets/images/bg/SubjectsWebsiteCowsImageDesktop.webp'
import cows_img_mobile from '../../assets/images/bg/SubjectsWebsiteCowsImageMobile.png'
import { isMobile } from "../../scripts/utils";
import titleSection4 from '../../assets/images/texts/Discover.svg';
import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from '../Title/Title.styles';

const Slide4 = () => {

    const scrollListener = () => {
        const element = document.querySelector('#title-s4');
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
            className="slide-4 slide-i section2"
            data_id={4}
        >
            <div className='container'>
                <div className='anchor_slide-wrapper' id="slide-4">
                    <div className='img_bg'>
                        <img src={isMobile ? cows_img_mobile : cows_img} alt="background"/>
                    </div>

                    <SectionTitle
                        type="light"
                        isMobile={isMobile}
                        className="main-title title4"
                        id='title-s4'
                        style={{position: 'absolute'}}
                    >
                        <TitleSection4>
                            <img src={titleSection4} alt=""/>
                        </TitleSection4>
                    </SectionTitle>
                </div>
            </div>
        </div>
    );
};

export default Slide4;
