import { Container, InfoItem, Left, NameItem, Right } from './Team.styles';
import React, { useState } from 'react';
import img_baby from '../../assets/images/texts/BabyTeethSignature.png'
import gsap from 'gsap';

export const Team = ({ appLoad, isMobile }) => {
    const [scrolledTo, setScrolledTo] = useState(false);

    const animateWallet = () => {
        const team = document.querySelector('.team');
        gsap.to(team, {
            scrollTrigger: {
                trigger: '.section5',
                start: `${20}% center`,
                end: `${20}% center`,
                onEnter: () => {
                    setScrolledTo(true);
                },
                scrub: true,
            },
        });
    };

    React.useEffect(() => {
        if (appLoad) {
            animateWallet();
        }
    }, [appLoad]);

    return (
        <Container isMobile={isMobile}>
            <Left isMobile={isMobile}>
                <NameItem active={true}>WHO IS BABY TEETH?</NameItem>
            </Left>
            <Right isMobile={isMobile}>
                <InfoItem
                  active={true}
                  scrolledTo={scrolledTo}
                  isMobile={isMobile}
                >
                    <span>
                        Baby Teeth is a London based artist and designer whose work
                        aims to capture youth zeitgeist through visual form.
                    </span>

                    <span>
                        With a multi-disciplinary career spanning over 10 years -
                        Baby Teeth was previously Head of Graphics for the likes
                        of Burberry, Heron Preston and Maharishi before breaking off
                        to establish Design Studio ‘Resistant Material’ working with
                        the likes of Pharrell Williams/N·E·R·D, Kendrick Lemar,
                        Baby Keem, Reese LaFlare & Playboy.
                    </span>
                    <span>
                        The ‘Subjects’ project is the culmination of Baby Teeth’s
                        creative journey to date, drawing influence from a decade
                        of exposure to fashion, music and youth culture.
                    </span>
                    <span>
                        <img src={img_baby} alt=""/>
                    </span>
                </InfoItem>
            </Right>
        </Container>
    );
};
