import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    color: white;
    position:fixed;
    top:0;
    left:0%;
    width:100%;
    height:50px;
    display:flex;
    align-items: center;
    padding: 0px 20px;
    background-color:black;
    box-shadow:0px 1px 5px 2px rgba(255, 255, 255, 0.8);
    z-index: 10;
    justify-content: space-between;
`;
const Logo = styled.a`
    display: flex;
    align-items: center;
    font-weight: 600;
`;
const Img = styled.div`
    background-image: url(${props => props.bgUrl});
    background-size: cover;
    width: 50px;
    height: 50px;
`;
const Name = styled.span`
    font-size: 20px;
    margin-right: 20px;
`;
const List = styled.ul`display: flex;`;
const Item = styled.li`
    width: 50px;
    height:50px;
    text-align: center;
    border-bottom:3px solid ${props => props.current ? "white" : "transparent"};
    transition:border-bottom .5s ease-in-out;
    margin-right: 10px;
`;
const SLink = styled(Link)`
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const LoginBtn = styled.button`
    font-size: 15px;
    outline: none;
    border: 1px solid white;
    border-radius: 5px;
    padding: 3px;
    margin-right: 10px;
`;


export default withRouter(({ location: { pathname } }) => (
    <Header>
        <List>
            <Link to="/">
                <Logo>
                    <Img bgUrl={"https://cdn4.vectorstock.com/i/1000x1000/50/73/s-letter-logo-design-letter-s-design-s-logo-vector-28025073.jpg"} />
                    <Name>S-Flix</Name>
                </Logo>
            </Link>
            <Item current={pathname === "/"}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={pathname === "/tv"}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
        <LoginBtn>
            <SLink to="/login">Login</SLink>
        </LoginBtn>
    </Header>
));