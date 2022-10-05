import React from 'react';
import videoURL1 from '../../../assets/video/Video-compressed.mp4';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BackgroundContainer,
    VideoContainer,
} from './Slide1.styles';
import { ReactComponent as LogoSVG } from '../../../assets/images/svg/SubjectsLogotype.svg';
import { isMobile } from '../../../scripts/utils';
import constants from '../../../scripts/constants';


let params = new URLSearchParams(window.location.search);
const videor = params.get('quality')

const Slide1 = ({
    appLoad,
    setAppLoad,
}) => {
    const smallVideoRef = React.useRef(null);
    const smallVideoElRef = React.useRef(null);

    const setSmallVideoSize = (self) => {
        smallVideoRef.current.style.height =
            Math.floor(self.progress * 100) + 4 + '%';
        smallVideoRef.current.style.width =
            Math.floor(self.progress * 100) + 18.8 + '%';
    };


    React.useEffect(() => {
        if (appLoad && !isMobile) {
            const refs = document.querySelector('.slide-1');

            ScrollTrigger.create({
                trigger: refs,
                start: 'top 65%',
                end: 'bottom 65%',
                onUpdate: setSmallVideoSize,
            });
        }
    }, [appLoad]);

    React.useEffect(() => {
        smallVideoElRef.current.addEventListener(
            'loadeddata',
            () => {
                // setTimeout(() => {
                    setAppLoad(true);
                // }, 1000);
            },
            false
        );
    }, []);

    return (
        <div
            id="slide-1"
            className="slide-1 slide-i"
            data_id={1}
        >
            <BackgroundContainer loaded={appLoad}>
                <LogoSVG
                    style={{
                        fill: isMobile
                            ? constants.COLOR_WHITE
                            : constants.COLOR_BLACK,
                    }}
                />
            </BackgroundContainer>
                <VideoContainer loaded={appLoad} ref={smallVideoRef}>
                    <video
                        width="400"
                        height="300"
                        muted
                        playsInline
                        autoPlay
                        loop
                        ref={smallVideoElRef}
                    >
                      <source
                        src={
                          videor ? 'https://www.w3schools.com/html/mov_bbb.mp4' : videoURL1}
                        // src={'https://www.w3schools.com/html/mov_bbb.mp4'}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                    </video>
          </VideoContainer>
        </div>
    );
};

export default Slide1;
