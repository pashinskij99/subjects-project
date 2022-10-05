import React from 'react';
import subjects_icon from '../../assets/images/svg/SubjectsFooterLogo.svg';
import {
    Container,
    Content,
    FooterTop,
    Navigation,
} from './PageFooter.styles';

const PageFooter = () => {
    const dataLinks3 = [
        {
            title: 'Twitter',
            url: 'https://twitter.com/subjectsworld',
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/subjectsworld/',
        },
        {
            title: 'Opensea',
            url: '',
        },
    ];

    const disableClick = (event) => {
        event.preventDefault()
    }

    return (
        <Container className="page-footer">
            <Content>
                <FooterTop>
                    <a href="#" target="_blank">
                        <img src={subjects_icon} alt=""/>
                    </a>
                    <Navigation>
                        <nav className="page-footer__menu">
                            {dataLinks3.map((el, id) => (
                                <a target="_blank" href={el.url} key={id} onClick={id === 2 ? disableClick : null}>
                                    {el.title}
                                </a>
                            ))}
                        </nav>
                    </Navigation>
                </FooterTop>
            </Content>
        </Container>
    );
};

export default PageFooter;
