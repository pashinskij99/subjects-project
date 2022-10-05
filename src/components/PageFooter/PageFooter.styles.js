import styled from 'styled-components/macro';
import { isMobile } from '../../scripts/utils';
import constants from '../../scripts/constants';

export const Container = styled.div`
    position: relative;
    z-index: inherit;
    height: ${isMobile ? '56rem' : 'auto'};
    padding: ${isMobile ? '11rem 13.3rem' : '2.7vw'};
    background-color: #d7d7cb;
    opacity: 1;
`;

export const Content = styled.div`
    height: ${isMobile ? '100%' : '100%'};
    display: flex;
    flex-direction: ${isMobile ? 'column-reverse' : 'column'};
    justify-content: ${isMobile ? 'center' : 'space-between'};
    align-items: ${isMobile ? 'center' : 'flex-start'} ;
`;

const applyMobileNav = () => {
    if (isMobile)
        return 'display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%;';
};

export const Navigation = styled.div`
    display: flex;
    width: 100%;
    min-height: 100%;
    justify-content: ${isMobile ? '' : 'flex-end'};
    nav {
      display: flex;
      justify-content: space-between;
    }
`;

export const FooterTop = styled.div`
  height: ${isMobile ? '70%' : ''};
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: center;
  }
  a {
      opacity: 1;
      display: block;
      width: ${isMobile ? '35.9vw' : '' } ;
      @media screen and (max-width: 767px) {
          // margin-bottom: 8rem;
      }
  }
  nav {
      ${applyMobileNav()};
      margin-left: ${isMobile ? '' : ''};
      margin: 0;
      &:first-of-type {
          margin-left: ${isMobile ? '0' : ''};
      }
      width: ${isMobile ? '33%' : '16.2vw'};
      flex-direction: ${isMobile ? 'row' : 'column'};
      &:last-of-type {
          width: ${isMobile ? '100%' : '8.1vw'};
      }
      a {
          font-family: 'HelveticaNeueBold', serif;
          font-weight: 700;
          font-size: ${isMobile ? '3.07rem' : '0.85rem'};
          line-height: ${isMobile ? '6rem' : '1rem'};
          margin: 0;
          color: ${constants.COLOR_BLACK};
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
          @media screen and (max-width: 767px) {
              width: fit-content;
          }
          &:hover {
              opacity: 0.7;
          }
      }
    }
`