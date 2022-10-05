import styled from 'styled-components/macro';
import constants from '../../scripts/constants';

export const SVGContainer = styled.div`
    height: ${({ isMobile }) => (isMobile === '1' ? '6.25vw' : '2.7vw')};
    width: ${({ isMobile }) => (isMobile === '1' ? '6.25vw' : '2.7vw')};
    margin-left: ${({ isMobile }) => (isMobile === '1' ? '' : '2.7vw')};
`;

export const WalletLink = styled.a`
    z-index: 1010;
    width: ${({ isMobile }) => (isMobile === '1' ? '' : '')};
    color: black;
    position: fixed;
    display: flex;
    justify-content: ${({ isMobile }) =>
        isMobile !== '1'
            ? 'center'
            : ({ isLanding }) => (isLanding ? 'end' : 'space-between')};
    align-items: center;
    left: ${({ isMobile }) => (isMobile === '1' ? '' : '')};
    right: ${({ isMobile }) => (isMobile === '1' ? '' : '2.7%')};
    bottom: ${({ isMobile }) => (isMobile === '1' ? '5.5vw' : '2.1875rem')};
    font-size: 1.75rem;
    line-height: 1;
    background: transparent;
    transition: opacity 0.5s ease-in-out;
    span {
        color: ${({ isMobile }) =>
            isMobile === '1' ? constants.COLOR_WHITE : constants.COLOR_BLACK};
        font-family: HelveticaNeueBold, serif;
        font-weight: 700;
        margin-right: ${({ isMobile }) => (isMobile === '1' ? '1rem' : '')};
        font-size: ${({ isMobile }) => (isMobile === '1' ? '6rem' : '2.1rem')};
        letter-spacing: 0.005em;
        opacity: ${({ loaded }) => (loaded ? 1 : 0)};
        transition: opacity 1s ease-in-out 2s, visibility 0.5s ease,
            color 0.5s ease-in-out 0s, background 0.3s ease-in-out;
    }
`;
