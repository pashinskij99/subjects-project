import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile === '1' ? 'column' : 'row')};
    width: ${({ isMobile }) => (isMobile === '1' ? '87.5%' : '83.8%')};
    min-height: ${({ isMobile }) => (isMobile === '1' ? '100vh' : '30%')};
    padding: 10rem 0;
    margin: auto;
`;

export const Left = styled.div`
    width: ${({ isMobile }) => (isMobile === '1' ? '100%' : '40%')};
    margin-bottom: ${({ isMobile }) => (isMobile === '1' ? '35.3rem' : '')};
    display: flex;
    flex-direction: column;
    span {
        color: #1c1c1c;
        font-family: TimesNewRoman, serif;
        font-size: ${({ isMobile }) => (isMobile === '1' ? '6.7rem' : '2rem')};
        margin-bottom: ${({ isMobile }) =>
            isMobile === '1' ? '3rem' : '1rem'};
        cursor: pointer;
        text-align: left;
    }
`;

export const NameItem = styled.span`
    opacity: ${({ active }) => (active ? 1 : 0.2)};
    transition: opacity 0.5s;
`;

export const Right = styled.div`
    width: ${({ isMobile }) => (isMobile === '1' ? '100%' : '60%')};
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const InfoItem = styled.div`
    width: 100%;
    opacity: ${({ active, scrolledTo }) => (active && scrolledTo ? 1 : 0)};
    transition: opacity 1.5s;
    display: flex;
    align-items: ${({ isMobile }) => (isMobile === '1' ? 'center' : 'end')};
    flex-direction: column;
    img {
        width: 35%;
    }
    span {
        color: #1c1c1c;
        font-family: HelveticaNeueBold, serif;
        font-weight: 700;
        line-height: ${({ isMobile }) => (isMobile === '1' ? '5.23rem' : '2rem')};
        margin-bottom: ${({ isMobile }) => (isMobile === '1' ? '5rem' : '1.8rem')};
        font-size: ${({ isMobile }) => (isMobile === '1' ? '3.65rem' : '1.2rem')};
        text-align: ${({ isMobile }) => (isMobile === '1' ? 'left' : 'left')};
    }
`;
