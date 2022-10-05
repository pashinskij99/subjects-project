import styled from 'styled-components/macro';
import { isMobile } from '../../../scripts/utils';

const applyMobileBg = () => {
    if (isMobile)
        return 'position: absolute; z-index: 100; left: 50%; width: 87.25%; transform: translateX(-50%); margin-top 22px';
};

export const BackgroundContainer = styled.div`
    ${applyMobileBg()};
    position: absolute;
    width: 94.6%;
    top: 0;
    z-index: 100;
    margin: ${isMobile ? '' : '2.7vw'};
    opacity: 1;
    transition-duration: 1.5s;
`;
