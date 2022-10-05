import React, {useState} from 'react';
import gsap from 'gsap';
import { SectionTitle, TitleHeader, TitleSection2, TitleSection4, TitleSection6, TitleSection7 } from './Title.styles';
import titleSection2 from '../../assets/images/texts/Imagine.svg';
import titleSection4 from '../../assets/images/texts/Discover.svg';

export const Title = ({ appLoad, isMobile }) => {
    const titleWrapperRef = React.useRef();
    const [sizeArr, setSizeArr] = useState([])
    const [titlesArr, setTitlesArr] = useState([])

    const data = {
        slide2: [
            // <TitleSection2>
            //     <img src={titleSection2} alt=""/>
            // </TitleSection2>,
        ],
        slide3: [
            // <TitleHeader>INTRODUCING</TitleHeader>,
            // <span>An Art Project</span>,
            // <span>
            //     By <a href={'/'}>Baby Teeth</a>
            // </span>,
            // <span>& Sutter Systems</span>,
        ],
        slide4: [
            // <TitleSection4>
            //     <img src={titleSection4} alt=""/>
            // </TitleSection4>,
        ],
        slide6: [
            // <TitleHeader>MINTING</TitleHeader>,
            // <span>1st Mint: <span className="small-text">Free</span></span>,
            // <span>2nd Mint (Optional): <span className="small-text">Paid</span></span>,
        ],
        slide7: [
            // <TitleHeader>ALLOWLIST</TitleHeader>,
            // <TitleSection7>Opening</TitleSection7>,
            // <TitleSection7>Soon</TitleSection7>,
        ],
    };

    // const showTitle = (section) => {
    //     switch (section) {
    //         case '.section4' :
    //             return '-5% top'
    //         default :
    //             return '-5% top'
    //     }
    // }
    //
    // const hideTitle = (section) => {
    //     switch (section) {
    //         case '.section4' :
    //             return '90% center';
    //         default :
    //             return '110% center';
    //     }
    // }

    // const animateTextStandard = (span, section, _i) => {
    //     if (isMobile === '1') {
    //         gsap.to(span, {
    //             opacity: 1,
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: section,
    //                 start: showTitle(section),
    //                 end: showTitle(section),
    //                 scrub: true,
    //             },
    //         });
    //         gsap.to(span, {
    //             opacity: 0,
    //             immediateRender: false,
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: section,
    //                 start: hideTitle(section),
    //                 end: hideTitle(section),
    //                 scrub: true,
    //             },
    //         });
    //
    //     } else {
    //         gsap.to(span, {
    //             opacity: 1,
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: section,
    //                 start: `${15}% center`,
    //                 end: `${15}% center`,
    //                 scrub: true,
    //             },
    //         });
    //         gsap.to(span, {
    //             opacity: 0,
    //             immediateRender: false,
    //             ease: 'none',
    //             scrollTrigger: {
    //                 trigger: section,
    //                 start: `${80}% center`,
    //                 end: `${80}% center`,
    //                 scrub: true,
    //                 markers: true
    //             },
    //         });
    //     }
    // };

    const sizesSections = () => {
        let arrScrollTopSections = []
        const allSections = document.querySelectorAll('.slide-i')
        allSections.forEach((item, i) => {
            // const heightSection = item.clientHeight
            const startSection = Math.floor(item.getBoundingClientRect().top + window.pageYOffset)

            let procent1
            let procent2

            switch (i) {
                case 1:
                    // procent1 = 10
                    procent1 = 25
                    // procent2 = 12
                    procent2 = 0
                    break
                case 2:
                    procent1 = 13
                    procent2 = 0
                    break
                case 3:
                    procent1 = 10
                    procent2 = 0
                    break
                case 4:
                    procent1 = 8
                    procent2 = 0
                    break
                case 5:
                    procent1 = 6
                    procent2 = 15
                    break
                default:
                    procent1 = 6
                    procent2 = 10
            }
            if (isMobile && i === 5) {
                procent1 = 6
                procent2 = 4
            }

            const result1 = Math.floor(startSection / 100 * procent1)
            const result2 = Math.floor(startSection / 100 * procent2)

            // const endSection = Math.floor(startSection + heightSection)
            // arrScrollTopSections.push([startSection - 100, endSection - 100])
            arrScrollTopSections.push([startSection - result1, startSection + result2]) // start, end
        })

        return arrScrollTopSections
    }

    // let lastScrollTop = 0

    const addAnimate = (elementOffsetArray, titles) => {
        let translateDefaultInPercent = 50
        for (let i = 0; i <= titles.length - 1; i++) {
            const finallyTranslate = Math.floor(-(titles[i].clientHeight / 100 * translateDefaultInPercent))

            window.addEventListener('scroll', () => {
                // const top = window.pageYOffset
                // if (lastScrollTop > top) {
                //     // console.log('top')
                //
                // } else if (lastScrollTop < top) {
                //     // console.log('bottom')
                //
                // }

                const windowPageY0Offset = Math.floor(window.pageYOffset)
                if (windowPageY0Offset >= elementOffsetArray[i + 1][0] && windowPageY0Offset <= elementOffsetArray[i + 1][1])
                    titles[i].style.opacity = '1'
                else if (windowPageY0Offset <= elementOffsetArray[i + 1][0])
                    titles[i].style.opacity = '0'
                if (windowPageY0Offset >= elementOffsetArray[i + 1][1]) {
                    // titles[i].style.position = 'absolute'
                    // titles[i].style.top = `${windowPageY0Offset <= elementOffsetArray[i + 1][1]}px`
                    // titles[i].style.top = `100px`
                    // titles[i].style.transform = `translateY(${finallyTranslate + (elementOffsetArray[i + 1][1] - windowPageY0Offset)}px)`
                    gsap.to(titles[i], {
                        y: () =>
                          (elementOffsetArray[i + 1][1] - windowPageY0Offset),
                        ease: 'none',
                    });
                }

                // lastScrollTop = top
            })
        }
    }

    const animateTitles = () => {
        const titles = titleWrapperRef.current.querySelectorAll('.main-title')

        return titles
    }

    // const getAllSections = () => {
    //     const titles =
    //       titleWrapperRef.current.querySelectorAll('.main-title');
    //     titles.forEach((title, titleId) => {
    //         const section = `${'.section' + titleId}`;
    //         title.querySelectorAll('span').forEach(span => {
    //             animateTextStandard(span, section, null)
    //         });
    //     });
    // }

    // React.useEffect(() => {
    //     if (appLoad) {
            // addAnimate(sizesSections(), animateTitles())
            // window.addEventListener('resize', () => {
            //     addAnimate(sizesSections(), animateTitles())
            // })
            // return () => window.removeEventListener('resize', () => {
            //     addAnimate(sizesSections(), animateTitles())
            // })
        // }
    // }, [appLoad]);

    return (
        <div
            className="inner title"
            ref={titleWrapperRef}
            style={{ pointerEvents: 'none' }}
        >
            <SectionTitle
                type="portrait"
                isMobile={isMobile}
                className="main-title title2"
            >
                {data.slide2.map((item, i) => {
                    return item;
                })}
            </SectionTitle>

            <SectionTitle
                type="dark"
                isMobile={isMobile}
                className="main-title title3"
            >
                {data.slide3.map((item, i) => {
                    return item;
                })}
            </SectionTitle>
            <SectionTitle
                type="light"
                isMobile={isMobile}
                className="main-title title4"
            >
                {data.slide4.map((item, i) => {
                    return item;
                })}
            </SectionTitle>
            <SectionTitle
                type="dark"
                isMobile={isMobile}
                className="main-title title6"
            >
                {data.slide6.map((item, i) => {
                    return item;
                })}
            </SectionTitle>
            <SectionTitle
                type="dark"
                isMobile={isMobile}
                className="main-title title7"
            >
                {data.slide7.map((item, i) => {
                    return item;
                })}
            </SectionTitle>
        </div>
    );
};
