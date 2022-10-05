import styled from 'styled-components/macro';
import constants from './scripts/constants';

export const Preloader = styled.div`
    opacity: ${({ loaded }) => (loaded ? 0 : 1)};
    pointer-events: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: ${constants.COLOR_WHITE};
    z-index: 1000;
`;