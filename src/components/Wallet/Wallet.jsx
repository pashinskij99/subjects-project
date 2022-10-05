import React from 'react';
import { ReactComponent as WalletIcon } from '../../assets/images/svg/Subjects Icon Multi Gradient.svg';
import { ReactComponent as WalletIconWhite } from '../../assets/images/svg/SubjectsIconWhite.svg';
import { SVGContainer, WalletLink } from './Wallet.styles';
import gsap from 'gsap';

const Wallet = ({ appLoad, isMobile, isLanding }) => {
    const animateWalletOpacity = (wallet) => {
        gsap.to(wallet, {
            opacity: 1,
            pointerEvents: 'auto',
            ease: 'none',
            scrollTrigger: {
                trigger: '.section5',
                start: `${15}% center`,
                end: `${15}% center`,
                scrub: true,
            },
        });
        gsap.to(wallet, {
            opacity: 0,
            pointerEvents: 'none',
            ease: 'none',
            scrollTrigger: {
                trigger: '.section5',
                start: `${30}% center`,
                end: `${30}% center`,
                scrub: true,
            },
        });
    };

    React.useEffect(() => {
        if (appLoad) {
            animateWalletOpacity('.wallet')
        }
    }, [appLoad, isMobile]);

    return (
        <WalletLink
            loaded={appLoad}
            isMobile={isMobile}
            isLanding={isLanding}
            href="#"
            target="_blank"
            className="wallet"
        >
            <SVGContainer isMobile={isMobile}>
                {isLanding ? <WalletIconWhite /> : <WalletIcon />}
            </SVGContainer>
        </WalletLink>
    );
};

export default Wallet;
