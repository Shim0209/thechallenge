import React from 'react';
import { useLocation } from 'react-router';
import styled from "styled-components";

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
`;

const LeftBox = styled.div`
    padding: 5px;
    width: 20%;
    border: 1px solid red;
`;
const RightBox = styled.div`
    padding: 5px;
    width: 80%;
    border: 1px solid indigo;
`;
const NavItem = styled.div`
    border: 2px solid gray;
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
    &:hover{
        background-color: black;
        color: white;
    }
`;
const NavStatus = styled.div``;
const NavAlert = styled.div`
    text-align: center;
    &:hover {
        border: 1px solid white;
    }
`;

const Dashboard = (props) => {
    const location = useLocation();

    console.log('전달받은 데이터',location);

    return (
        <Container>
            <LeftBox>
                <NavItem>
                    <NavTitle>프로필</NavTitle>
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
            </LeftBox>
            <RightBox>
                Right
            </RightBox>
        </Container>
    )
};

export default Dashboard;