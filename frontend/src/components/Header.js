import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = styled.div`
    background-color: #fafafa;

    position: fixed;
    width: 100%;
    height: 60px;
    margin:0;
    padding: 0px 20px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    z-index: 100;
    position: relative; /* 이게 있어야 다른 컴포넌트와 안겹침 */
`;
const HeaderIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    box-sizing:border-box;
    height: inherit;
    width:6%;
`;
const HeaderNav = styled.div`
    width: 85%;
    padding: 0px 5px;
`;
const NavUl = styled.ul`display:flex`;
const NavLi = styled.li`
    color: ${props => props.current ? "white" : "black"};
    background-color: ${props => props.current ? "black" : "#fafafa"};

    margin-left:20px;
    padding: 5px 10px;
    border-radius: 5px;
`;
const SLink = styled(Link)`
    font-weight: 500;
`;
const HeaderMenu = styled.div`
    padding-right: 20px;
`;
const MenuBtn = styled.button`
    background-color: #fafafa;

    border: none;
`;

export default withRouter(({ location: {pathname}}) => (
    <Header>
        <HeaderIcon>
            <SLink to="/login">
                <FontAwesomeIcon icon={["fab","slack"]} size="2x"/>
            </SLink>
        </HeaderIcon>
        <HeaderNav>
            <NavUl>
                <NavLi current={pathname === "/"}>
                    <SLink to="/">Home</SLink>
                </NavLi>
                <NavLi current={pathname === "/challenge"}>
                    <SLink to="/challenge">Challenge</SLink>
                </NavLi>
                <NavLi current={pathname === "/dashboard"}>
                    <SLink to="/dashboard">Dashboard</SLink>
                </NavLi>
                <NavLi current={pathname === "/mandalart"}>
                    <SLink to="/mandalart">Mandalart</SLink>
                </NavLi>
            </NavUl>
        </HeaderNav>
        <HeaderMenu>
            <MenuBtn>
                <FontAwesomeIcon icon={["fas","user-circle"]} size="2x" />
            </MenuBtn>
        </HeaderMenu>
    </Header>
));