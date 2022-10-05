import styled from 'styled-components/macro';
import { isMobile } from '../../../scripts/utils';
import beach_img from '../../../assets/images/bg/beach_img.jpg'

export const Container = styled.div``;

export const VideoContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${isMobile ? '100%' : '50%'};
    height: ${isMobile ? '100%' : '50%'};
    overflow: hidden;
    transform: translate3d(-50%, -50%, 0);
    @media screen and (max-width: 767px) {
        background: url(${beach_img})no-repeat top / cover;
    }
    video {
        opacity: ${({ loaded }) => (loaded ? 1 : 0)};
        filter: ${({ loaded }) => (loaded ? 'none' : 'blur(6px)')};
        transition-duration: 2s;
        transition-delay: 1s;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: ${isMobile ? 'none' : 'cover'};
        @media screen and (max-width: 767px) {
            display: none;
        }
    }
`;

const applyMobileBg = () => {
    if (isMobile)
        return 'position: absolute; z-index: 100; left: 50%; width: 87.25%; transform: translateX(-50%); margin-top 22px';
};

export const BackgroundContainer = styled.div`
    ${applyMobileBg()};
    margin: ${isMobile ? '' : '2.7vw'};
    opacity: ${({ loaded }) => (loaded ? 1 : 0)};
    transition-duration: 1.5s;
`;

export const DownArrow = styled.a`
    position: absolute;
    z-index: 1000;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
`;
