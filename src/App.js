import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Wallet from './components/Wallet/Wallet';
import Slide1 from './components/Content/Slide1/Slide1';
import Slide2 from './components/Content/Slide2/Slide2';
import Slide3 from './components/Content/Slide3/Slide3';
import Slide4 from './components/Content/Slide4';
import Slide6 from './components/Content/Slide6';
import Slide7 from './components/Content/Slide7/Slide7';
import Slide8 from './components/Content/Slide8';

import PageFooter from './components/PageFooter/PageFooter';
import { Title } from './components/Title/Title';
import { Preloader } from './App.styles';
import { useWindowSize } from './scripts/customHooks';
import { SlideLanding } from './components/Content/SlideLanding/SlideLanding';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [activePage, setActivePage] = React.useState('main');
    const [isMobile] = useWindowSize();
    const [appLoad, setAppLoad] = React.useState(false);

    React.useEffect(() => {
        let tid = setInterval(function () {
            if (document.readyState !== 'complete') return;

            clearInterval(tid);
        }, 100);
    }, []);

    const gsapAddSmoothScroll = () => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        let container = document.querySelector('.app-slider');
        // let containerTitles = document.querySelector('.title');

        let height;
        function setHeight() {
            height = container.clientHeight;
            document.body.style.height = height + 'px';
        }
        if (isMobile === '0') {
            ScrollTrigger.addEventListener('refreshInit', setHeight);

            gsap.to(container, {
                y: () =>
                    -(
                        container.getBoundingClientRect().height -
                        document.documentElement.clientHeight
                    ),
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // gsap.to(containerTitles, {
            //     y: () =>
            //       -(
            //         container.getBoundingClientRect().height -
            //         document.documentElement.clientHeight
            //       ),
            //     ease: 'none',
            //     scrollTrigger: {
            //         trigger: document.body,
            //         start: 'top top',
            //         end: 'bottom bottom',
            //         scrub: 1,
            //         invalidateOnRefresh: true,
            //     },
            // });

            setHeight();
            document.querySelector('#root').style.position = 'fixed';
        }
    };

    React.useEffect(() => {
        if (appLoad) {
            gsapAddSmoothScroll();
        }
    }, [appLoad]);

    useEffect(() => {
        if (activePage === 'landing') {
            gsapAddSmoothScroll();
        }
    }, [activePage]);

    const calculate1VH = () => {
        setTimeout(() => {
            const vh = window.innerHeight / 100;
            document.body.style.setProperty('--vh', vh + 'px');
        }, 300);
    };

    React.useEffect(() => {
        window.addEventListener('load', calculate1VH());

        return () => window.removeEventListener('load', calculate1VH());
    }, [window.innerHeight, window.innerWidth]);
    React.useEffect(() => {
        window.addEventListener('resize', calculate1VH);

        return () => window.removeEventListener('resize', calculate1VH);
    }, [window.innerHeight, window.innerWidth]);
    React.useEffect(() => {
        window.addEventListener('orientationchange', calculate1VH());

        return () => window.removeEventListener('orientationchange', calculate1VH());
    }, [window.innerHeight, window.innerWidth]);

    const scrollContainer = useRef(null);

    if (activePage === 'menu')
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: 'white',
                }}
            >
                <button
                    style={{
                        color: 'blue',
                        textDecoration: 'underline',
                        marginRight: '1rem',
                    }}
                    onClick={() => {
                        setActivePage('landing');
                    }}
                >
                    Landing Page
                </button>
                <button
                    style={{ color: 'blue', textDecoration: 'underline' }}
                    onClick={() => {
                        setActivePage('main');
                    }}
                >
                    Main Page
                </button>
            </div>
        );
    if (activePage === 'main')
        return (
            <>
                <Preloader loaded={appLoad} />
                <div
                    ref={scrollContainer}
                    className="App"
                >
                    <Wallet
                      appLoad={appLoad}
                      isMobile={isMobile}
                      isLanding={false}
                    />
                    {/* <Title
                        appLoad={appLoad}
                        isMobile={isMobile}
                        isInSlidesWrapper={false}
                    /> */}

                    <div className="wrapper app-slider">
                        {/*<Title*/}
                        {/*  appLoad={appLoad}*/}
                        {/*  isMobile={isMobile}*/}
                        {/*  isInSlidesWrapper={true}*/}
                        {/*/>*/}
                        <Slide1
                            setAppLoad={setAppLoad}
                            appLoad={appLoad}
                        />
                        <Slide2 isMobile={isMobile} />
                        <Slide3 index={2} isMobile={isMobile} />
                        <Slide4 isMobile={isMobile} />
                        <Slide6 isMobile={isMobile} index={5} />
                        <Slide7 isMobile={isMobile} index={6} />
                        <Slide8
                            appLoad={appLoad}
                            isMobile={isMobile}
                        />
                        <PageFooter />
                    </div>
                </div>
            </>
        );
    // if (activePage === 'landing') {
    //     return (
    //         <>
    //             <div
    //                 ref={scrollContainer}
    //                 className="App"
    //             >
    //                 <Wallet
    //                     appLoad={appLoad}
    //                     isMobile={isMobile}
    //                     isLanding={true}
    //                 />
    //                 <Title
    //                     appLoad={appLoad}
    //                     isMobile={isMobile}
    //                 />
    //
    //                 <div className="wrapper app-slider">
    //                     <SlideLanding index={3} isMobile={isMobile} />
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }
}

export default App;
