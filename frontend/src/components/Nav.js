import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const NavItem = styled.div`
    margin-bottom: 10px;
`;
const NavTitle = styled.div`
    padding: 5px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid black ;
`;
const NavList = styled.ul`
    padding: 5px 10px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
`;
const NavListItem = styled.li`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    color: ${props => props.current ? "white" : "black"};
    background-color: ${props => props.current ? "black" : "#fafafa"};
`;
const NavStatus = styled.div``;
const NavAlert = styled.div`
    text-align: center;
    &:hover {
        border: 1px solid white;
    }
`;
const SLink = styled(Link)`
    font-weight: 500;
`;

export default withRouter(({ location: {pathname}}) => (
    <>
        <NavItem>
            <NavTitle>프로필</NavTitle>
            <NavList>
                <NavListItem current={pathname === "/profile"}>
                    <SLink to="/profile">개인정보</SLink>
                </NavListItem>
            </NavList>
        </NavItem>
        <NavItem>
            <NavTitle>챌린지</NavTitle>
            <NavList>
                <NavListItem>
                    <NavStatus>대기</NavStatus>
                    <NavAlert>2</NavAlert>
                </NavListItem>
                <NavListItem>
                    <NavStatus>진행</NavStatus>
                    <NavAlert>1</NavAlert>
                </NavListItem>
                <NavListItem>
                    <NavStatus>과제</NavStatus>
                    <NavAlert>5</NavAlert>
                </NavListItem>
                <NavListItem>
                    <NavStatus>운영</NavStatus>
                    <NavAlert>1</NavAlert>
                </NavListItem>
            </NavList>
        </NavItem>
        <NavItem>
            <NavTitle>타이머</NavTitle>
            <NavList>
                <NavListItem>빠른시작</NavListItem>
                <NavListItem>기록</NavListItem>
            </NavList>
        </NavItem>
        <NavItem>
            <NavTitle>만다아트</NavTitle>
            <NavList>
                <NavListItem>
                    <NavStatus>2021 목표</NavStatus>
                </NavListItem>
                <NavListItem>
                    <NavStatus>학교생활 목표</NavStatus>
                </NavListItem>
                <NavListItem>
                    <NavStatus>좋은사람되기 목표</NavStatus>
                </NavListItem>
            </NavList>
        </NavItem>
    </>
));