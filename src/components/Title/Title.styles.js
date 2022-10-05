import styled from 'styled-components/macro';
import { isMobile } from '../../scripts/utils';
import constants from '../../scripts/constants';
import titleSection2 from '../../assets/images/texts/Imagine.svg';

const handleTitleType = (type, isMobile) => {
    switch (type) {
        case 'portrait':
            return `
            flex-direction: ${isMobile ? 'column' : 'row'}; 
            justify-content: center; color: ${constants.COLOR_ORANGE}; 
            `
        case 'light':
            return `
            flex-direction: column; 
            color: ${constants.COLOR_WHITE}; 
            align-items: ${isMobile ? 'flex-start' : 'baseline'};
          `
        case 'dark':
            return `
            flex-direction: column; 
            color: ${constants.COLOR_BLACK}; 
            align-items: baseline; 
            `
        default:
            return `
            flex-direction: column; 
            // color: #fff;
            `;
    }
};

export const SectionTitle = styled.h2`
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    width: ${({ isMobile }) => (isMobile ? '87.5%' : '83.8%')};
    font-size: ${({ isMobile }) => (isMobile ? '4.5rem' : '5rem')};
    line-height: 4.85rem;
    ${({ type, isMobile }) => handleTitleType(type, isMobile)};
    font-family: 'HelveticaNeueBold', serif;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
    transition: opacity 0.75s ease-in-out;
    z-index: 100;
    .small-text {
        font-family: 'TimesNewRoman',serif;
        font-weight: 400;
    }
    
    span {
        opacity: 1;
        transition: opacity 0.75s ease-in-out;
        ${({ isMobile }) =>
            isMobile
                ? 'line-height: 9.5rem; font-size: 7.5rem; text-align: start; letter-spacing: -1px;'
                : 'letter-spacing: -2px'};
        a {
            pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
            color: inherit;
            transition-duration: 0.3s;
            :hover {
                opacity: 0.7;
            }
        }
    }
`;

export const TitleHeader = styled.span`
    font-family: 'TimesNewRoman', serif;
    font-size: ${isMobile ? '4.1rem !important' : '2.47rem !important'};
    font-weight: 400;
    line-height: ${isMobile ? '4.7rem !important' : '2.85rem !important'};
    color: ${(props) => props.color ? props.color : null}
`;

export const TitleSection2 = styled.span`
    // width: 87.5%;
    // right: auto;
`

export const TitleSection4 = styled.span`
    width: 100%;
`

export const TitleSection6 = styled.span`
    display: inline-block;
    transform: rotate(180deg);
    font-size: 4rem;
`

export const TitleSection7 = styled.span`
    // color: #fff;
`
