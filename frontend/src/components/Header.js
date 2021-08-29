import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import verifJwt from 'components/auth/verifJwt';

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
    box-shadow: 0px 0px 3px 1px gray;
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
    cursor: pointer;
    border: none;
`;
const MenuModal = styled.div`
    position: fixed;
    top: 50px;
    right: 20px;
    width: 200px;
    height: 230px;
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;
    border-radius: 10px;
    z-index: 100;
    display: none;
`;
const MenuHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 45%;
    gap: 10px;
`;
const HeaderTitle = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: 500;
`;
const HeaderEmail = styled.div`
    text-align: center;
    font-size: 15px;
    color: gray;
`;
const HeaderProfile = styled.a`
    cursor: pointer;
    text-align: center;
    border: 1px solid gray;
    border-radius: 10px;
    width: 30%;
    align-self: center;
    padding: 5px;
`;
const MenuHorizon = styled.div`
    border-bottom: 1px solid gray;
`;
const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    height: 55%;
    gap: 10px;
`;
const ListItem = styled.li`
    padding: 0 15px;
`;
const ListA = styled.a`
    font-style: oblique;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 15px;
    &:hover {
        background-color: black;
        color: white;
    }
`;
/* 브라우저 아무곳이나 클릭해도 모달창 닫히도록 */
const modalEvent = (e) => {
    document.getElementsByClassName("menuModal")[0].style.display = 'none';
}
window.addEventListener('mouseup', modalEvent);

const modalHandler = (e) => {
    document.getElementsByClassName("menuModal")[0].style.display = 'block';
}


export default withRouter(({ location: {pathname}}) => (
    <>
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
                </NavUl>
            </HeaderNav>
            <HeaderMenu>
                <MenuBtn onClick={modalHandler}>
                    <FontAwesomeIcon icon={["fas","user-circle"]} size="2x" />
                </MenuBtn>
            </HeaderMenu>
        </Header>
        <MenuModal className="menuModal">
            <MenuHeader>
                <HeaderTitle>Shim</HeaderTitle>
                <HeaderEmail>sim@gamil.com</HeaderEmail>
                <HeaderProfile>
                    <SLink to="/profile">Profile</SLink>
                </HeaderProfile>
            </MenuHeader>
            <MenuHorizon></MenuHorizon>
            <MenuList>
                <ListItem>
                    {verifJwt() ? '' : <ListA><SLink to="/login">Login <FontAwesomeIcon icon={["fas","chevron-right"]} /></SLink></ListA>}
                </ListItem>
                <ListItem>
                    {verifJwt() ? <ListA><SLink to="/logout">Logout <FontAwesomeIcon icon={["fas","chevron-right"]} /></SLink></ListA> : ''}
                </ListItem>
                <ListItem>
                    {verifJwt() ? '' : <ListA><SLink to="/signup">Signup <FontAwesomeIcon icon={["fas","chevron-right"]} /></SLink></ListA>}
                </ListItem>
                <ListItem>
                    {verifJwt() ? <ListA>Mandalart <FontAwesomeIcon icon={["fas","chevron-right"]} /></ListA> : ''}
                </ListItem>
            </MenuList>
        </MenuModal>
    </>     
));