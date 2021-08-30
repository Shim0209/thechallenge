import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    background-color: #fafafa;

    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    margin:0;
    padding: 0px 20px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px gray;
    z-index: 100;
    position: relative; /* 이게 있어야 다른 컴포넌트와 안겹침 */
`;

const FooterItem = styled.div`
    color: gray;
    font-style: italic;
`;

const Footer = (props) => {
        
    return (
        <Container>
            <FooterItem>Copyright © ShimYS All Rights Reserved</FooterItem>
            <FooterItem>Designed by ShimYS</FooterItem>
        </Container>
    )
};

export default Footer;