import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 60px);

    display: flex;
    justify-content: center;
    align-items: center;
`;
const LogoutBox = styled.div`
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;

    width: 350px;
    height:200px;
    border-radius:20px;
    padding:0 40px 20px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LogoutTitle = styled.div`
    font-size: 35px;
    font-weight: 600px;
    font-style: italic;
    padding-top: 20px;
    margin-bottom: 30px;
`;
const LogoutBtn = styled.button`
    cursor: pointer;
    height: 35px;
    width: 100%;
    background-color: #fafafa;
    color: #0095f6;
    border:2px solid #0095f6;
    border-radius:5px;
    &:hover{
        color: #fafafa;
        background-color: #0095f6;
        box-shadow: 0px 0px 1px 1px #0095f6;
    }
`;

const Logout = (props) => {
    const logoutHandler = () => {
        localStorage.clear();
        props.history.push("/login");
    }

    return (
        <Container>
            <LogoutBox>
                <LogoutTitle>다음에 또 만나요!</LogoutTitle>
                <LogoutBtn onClick={logoutHandler}>로그아웃</LogoutBtn>
            </LogoutBox>
        </Container>
    )
};
export default Logout;