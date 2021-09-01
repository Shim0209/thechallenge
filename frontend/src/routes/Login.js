import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { authApi } from 'api';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt_decode from 'jwt-decode';

/* 디자인 시작 */
const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 120px);

    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoginBox = styled.div`
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;

    width: 350px;
    height:600px;
    border-radius:20px;
    padding:20px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const LoginTitle = styled.div`
    height: 10%;
    font-size: 35px;
    font-weight: 600px;
    font-style: italic;
    padding-top: 20px;
`;
    /* 로그인 폼 */
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40%;
    width:100%;
`;
const FormInput = styled.input`
    height: 35px;
    border: 2px solid gray;
    border-radius: 5px;
    text-align: center;
    &:nth-child(1){
        margin-bottom: 10px;
    }
`;
const ErrorMessage = styled.div`
    height: 12px;
    margin: 5px 0;
    font-size: 12px;
    color:red;
    text-align: center;
`;
const FormBtn = styled.button`
    cursor: pointer;
    height: 35px;
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
    /* horizon */
const Horizon = styled.div`
    border-top: 1px solid gray;
    height: 1px;
    width: 100%;
    margin-bottom:10px;
`;
    /* Oauth */
const LoginOAuth = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40%;
    width: 100%;
`;
const OAuthItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content: flex-start;
    height:35px;
    margin-bottom:10px;
    box-sizing: border-box;
    padding:0 10px;
    color:white;
    font-weight:600;
    &:nth-child(1){
        background-color: #f72121;
    }
    &:nth-child(2){
        background-color: #3b5998;
    }
    &:nth-child(3){
        background-color: #04ad37;
    }
    &:nth-child(4){
        background-color: #f1db0e;
    }
    border-radius:5px;
`;
const OAuthImg = styled.img`
    width: 20px;
`;
const OauthLink = styled.a`
    margin-left: 65px;
`;
    /* Signup */
const LoginSignup = styled.div``;
const SLink = styled(Link)`
    padding: 5px;
    cursor: pointer;
    height: 20px;
    background-color: #fafafa;
    font-size:15px;
    color: #0095f6;
    border:none;
    border-radius:5px;
    &:hover{
        box-shadow: 0px 0px 1px 1px #0095f6;
    }
`;
/* 디자인 끝 */

/* 컴포넌트 */
const Login = (props) => {
    const [state, setState] = useState({
        username: null,
        password: null
    });
    const [error, setError] = useState({
        message: null
    });

    const onChange = (event) => {
        if(event.target.title === 'username'){
            setState({
                ...state,
                username: event.target.value
            })
        } else {
            setState({
                ...state,
                password: event.target.value
            })
        }
    }

    const data = {
        username: state.username,
        password: state.password
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        try{
            const {headers:{authorization}} = await authApi.login(data);
            const accessToken = authorization;
            const jwtToken = accessToken.replace('Bearer','');
            const decoded = jwt_decode(jwtToken); 
            const expiredTime = decoded.exp+'000';

            localStorage.setItem('AccessToken', authorization);
            localStorage.setItem('ExpiredTime', expiredTime);

            props.history.push("/");
        } catch(e){
            setError({
                message: '아이디 또는 비밀번호가 잘못되었습니다.'
            })
        }
    }

    return (
        <Container>
            <LoginBox>
                <LoginTitle>Login</LoginTitle>
                <LoginForm onSubmit={handleLogin}>
                    <FormInput type="text" placeholder=" Username" title="username" onChange={onChange} />
                    <FormInput type="password" placeholder=" Password" title="password" onChange={onChange} />
                    <ErrorMessage>{error.message}</ErrorMessage>
                    <FormBtn>로그인</FormBtn>
                </LoginForm>
                <Horizon></Horizon>
                <LoginOAuth>
                    <OAuthItem>
                        <FontAwesomeIcon icon={["fab","google-plus-square"]} size="2x" />
                        <OauthLink href="http://localhost:8080/oauth2/authorization/google" >Google 로그인</OauthLink>
                    </OAuthItem>
                    <OAuthItem>
                        <FontAwesomeIcon icon={["fab","facebook-square"] } size="2x" />
                        <OauthLink href="http://localhost:8080/oauth2/authorization/facebook" >Facebook 로그인</OauthLink>
                    </OAuthItem>
                    <OAuthItem>
                        <OAuthImg src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1504499304/in36bktetqoapibgeabo.png"></OAuthImg>
                        <OauthLink href="http://localhost:8080/oauth2/authorization/naver" >Naver 로그인</OauthLink>
                    </OAuthItem>
                    <OAuthItem>
                        <OAuthImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vWAECT2WzkfKyvodaPIdO3r4dkhSxp1DpzoQq9PwZ_KyBSgCkRGk2JbOYZLOPg_QhPQ&usqp=CAU"></OAuthImg>
                        <OauthLink href="http://localhost:8080/oauth2/authorization/kakao">Kakao 로그인</OauthLink>
                    </OAuthItem>
                </LoginOAuth>
                <LoginSignup>
                    <p>계정이 없으신가요? <SLink to="/signup">가입하기</SLink></p>
                </LoginSignup>
            </LoginBox>
        </Container>
    )
}

export default Login;