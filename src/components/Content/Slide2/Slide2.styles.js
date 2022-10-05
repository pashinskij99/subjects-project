import styled from 'styled-components/macro';
import { isMobile } from '../../../scripts/utils';
import bgImage from '../../../assets/images/bg/SubjectsWebsiteNYCImageDesktop.webp'
import bgImage_mobile from '../../../assets/images/bg/SubjectsWebsiteNYCImageMobile.png'

export const BGContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: ${({ isMobile }) => (isMobile === '1' ? '100%' : '152%')};
    left: 0;
    // background: #000;
    img {
        object-fit: cover;
        height: 100%;
    }
`;

export const BGImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    bottom: 0;
    left: 0;
    background: url(${isMobile ? bgImage_mobile : bgImage})no-repeat center / cover;
`
