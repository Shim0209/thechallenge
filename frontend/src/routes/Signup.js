import React, {useState}  from 'react';
import { authApi } from 'api';
import styled from "styled-components";

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 60px);

    display: flex;
    justify-content: center;
    align-items: center;
`;
const SignupBox = styled.div`
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;

    width: 350px;
    height:550px;
    border-radius:20px;
    padding:0 40px 20px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const SignupTitle = styled.div`
    font-size: 35px;
    font-weight: 600px;
    font-style: italic;
    padding-top: 20px;
    margin-bottom: 30px;
`;
const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
`;
const FormInput = styled.input`
    height: 35px;
    border: 2px solid gray;
    border-radius: 5px;
    text-align: center;
    &:nth-child(1){
        width: 75%;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;
const ErrorMessage = styled.div`
    height: 12px;
    margin: 5px 0;
    font-size: 12px;
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
const DupBox = styled.div`
`;
const DupCheckBtn = styled.a`
    background-color: #fafafa;
    color: #0095f6;
    padding: 8px;
    width: 25%;
    height: 35px;
    border: 2px solid gray;
    border-left: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor: pointer;
    &:hover{
        color: #fafafa;
        background-color: #0095f6;
        border: 1px solid #0095f6;
        box-shadow: 0px 0px 1px 1px #0095f6;
    }
`;
const CodeBox = styled.div`
    margin-top: 5px;
    display: flex;
    display: none;
    justify-content: space-around;
`;
const CodeTitle = styled.span`
    align-self: center;
    font-size: 13px;
`;
const CodeIput = styled.input`
    border: none;
    border-bottom:1px solid gray;
    text-align: center;
`;
const CodeBtn = styled.a`
    align-self: center;
    padding: 3px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #0095f6;
    &:hover {
        color: white;
        background-color: #0095f6;
    }
`;

const Signup = (props) => {
    const [state, setState] = useState({
        username: null,
        password: null,
        name:null,
        email:null
    });
    const [valid, setValid] = useState({
        username: false,
        name: false,
        password: false,
        email: false
    });
    const [error, setError] = useState({
        username: null,
        password: null,
        name:null,
        email:null
    });
    const [check, setCheck] = useState({
        username: false,
        password: false,
        email: false,
        dupbtn: false, // username 조건이 만족할 경우 true -> 중복체크 할 수 있음
        emailbtn: false,
        code: null
    });
    const onChange = (e) => {
        const { title, value } = e.target;
        setState({
            ...state,
            [title]: value  
        })
    }
    const checkDupl = async(e) => {
        e.preventDefault();

        if(check.dupbtn === true){
            const usernameInput = document.getElementsByClassName('usernameInput')[0];
            const rawUsername = usernameInput.value;
            
            const result = await authApi.duplication(rawUsername);

            if(result.data.code === -1){
                setMessage('duplication', false);
                usernameInput.style.color = '#EE2003';
                usernameInput.style.border = '2px solid #ED2003';
                document.getElementsByClassName('username')[0].style.color = '#EE2003';
                setValid({
                    ...valid,
                    username: false
                })
                setCheck({
                    ...check,
                    username: false
                })
            } else {
                setMessage('username', true);
                usernameInput.style.color = '#00D904';
                usernameInput.style.border = '2px solid #00D904';
                document.getElementsByClassName('username')[0].style.color = '#00D904';
                setValid({
                    ...valid,
                    username: true
                })
                setCheck({
                    ...check,
                    username: true
                })
            }
        }
    }
    const checkEmail = async(e) => {
        e.preventDefault();
        if(check.emailbtn === true){
            const emailInput = document.getElementsByClassName('emailInput')[0];
            const rawEmail = emailInput.value;
            
            const result = await authApi.emailcheck(rawEmail);
            
            if(result.data.code === 1){
                document.getElementsByClassName('codebox')[0].style.display = 'block';
                emailInput.style.color = 'black';
                emailInput.style.border = '2px solid gray';
                setError({
                    ...error,
                    email: null
                })
                setCheck({
                    ...check,
                    code:result.data.data
                })
                alert(rawEmail + '로 인증번호를 발송했습니다.');
            } else {
                setMessage('dupemail', false);
                emailInput.style.border = '2px solid #ED2003';
                document.getElementsByClassName('email')[0].style.color = '#EE2003';
                setValid({
                    ...valid,
                    email: false
                })
                setCheck({
                    ...check,
                    email: false
                })
            }

            // 인증코드와 입렵한 인증번호 비교해서 같으면 valid true 처리 / 틀리면 경고            
        }
    }
    const checkCode = (e) => {
        const codeValue = document.getElementsByClassName('codeValue')[0];
        const emailInput = document.getElementsByClassName('emailInput')[0];
        if(parseInt(codeValue.value) === check.code){
            document.getElementsByClassName('codebox')[0].style.display = 'none';
            setMessage('code', true);
            emailInput.style.color = '#00D904';
            emailInput.style.border = '2px solid #00D904';
            document.getElementsByClassName('email')[0].style.color = '#00D904';
            setValid({
                ...valid,
                email: true
            })
            setCheck({
                ...check,
                email: true
            })
        } else {
            setMessage('code', false);
            emailInput.style.color = '#EE2003';
            emailInput.style.border = '2px solid #ED2003';
            document.getElementsByClassName('email')[0].style.color = '#EE2003';
            setValid({
                ...valid,
                email: false
            })
            setCheck({
                ...check,
                email: false
            })
        }
    }
    const checkPassword = (e) => {
        const {title, value} = e.target;
        if(state.password === value){
            e.target.style.border = '2px solid #00D904';
            document.getElementsByClassName(title)[0].style.color = '#00D904';
            document.getElementsByClassName(title)[0].innerHTML = '비밀번호가 일치합니다.';
            setCheck({
                ...check,
                password: true
            })
        } else {
            e.target.style.border = '2px solid #ED2003';
            document.getElementsByClassName(title)[0].style.color = '#ED2003';
            document.getElementsByClassName(title)[0].innerHTML = '비밀번호가 일치하지 않습니다.';
            setCheck({
                ...check,
                password: false
            })
        }
    }
    const checkValid = async (e) => {
        const { title, value } = e.target;
        var regExp;
        // eslint-disable-next-line default-case
        switch(title){
            case 'username':
                regExp = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; //영문시작 숫자+언더바/하이픈 + 4~20자리
                break;
            case 'password':
                regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                break;
            case 'name':
                regExp = /^[가-힣a-zA-Z]+$/; //한글, 영문만 
                break;
            case 'email':
                regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                break;
        }

        if(regExp.test(value)){
            if(title === 'username'){
                // username
                e.target.style.border = '2px solid gray';
                setError({
                    ...error,
                    [title]: null
                })
                setCheck({
                    ...check,
                    dupbtn: true
                })
            } else if (title === 'email'){
                e.target.style.border = '2px solid gray';
                setError({
                    ...error,
                    [title]: null
                })
                setCheck({
                    ...check,
                    emailbtn: true
                })
            } else {
                setValid({
                    ...valid,
                    [title]: true
                })
                setMessage(title, true);
                e.target.style.border = '2px solid #00D904';
                document.getElementsByClassName(title)[0].style.color = '#00D904';
            }
            
        } else {
            setValid({
                ...valid,
                [title]: false
            })
            setMessage(title, false);
            e.target.style.border = '2px solid #ED2003';
            document.getElementsByClassName(title)[0].style.color = '#EE2003';
            if(title === 'username'){
                setCheck({
                    ...check,
                    dupbtn: false
                })
            } else if(title === 'email'){
                setCheck({
                    ...check,
                    emailbtn: false
                })
            }
        }

    }
    const setMessage = (title, result) => {
        let msg = null;
        // 성공 메세지
        if(result === true){
            // eslint-disable-next-line default-case
            switch(title){
                case 'username':
                    msg = '사용할 수 있는 Username 입니다.';
                    break;
                case 'password':
                    msg = '사용할 수 있는 Password 입니다.';
                    break;
                case 'name':
                    msg = '사용할 수 있는 Name 입니다.';
                    break;
                case 'email':
                    msg = '사용할 수 있는 Email 입니다.';
                    break;
                case 'code':
                    msg = '이메일 인증이 정상적으로 처리되었습니다.';
                    title = 'email'
                    break;
            }
            
        // 실패 메세지
        } else {
            // eslint-disable-next-line default-case
            switch(title){
                case 'username':
                    msg = '영문시작, 영문/숫자/언더바/하이픈, 4~20자';
                    break;
                case 'password':
                    msg = '8자리 이상, 대문자, 소문자, 특수문자, 숫자 포함';
                    break;
                case 'name': 
                    msg = '한글, 영문';
                    break;
                case 'email':
                    msg = '이메일 형식';
                    break;
                case 'duplication':
                    msg = '중복된 아이디 입니다.';
                    title = 'username';
                    break;
                case 'code':
                    msg = '인증코드가 틀렸습니다.';
                    title = 'email';
                    break;
                case 'dupemail':
                    msg = '중복된 이메일 입니다.';
                    title = 'email';
                    break;
            }
        }

        setError({
            ...error,
            [title]: msg
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("username", state.username);
        form.append("name", state.name);
        form.append("password", state.password);
        form.append("email", state.email);

        if(check.username && check.password){
            const {data} = await authApi.signup(form);

            if(data.code === 1){
                props.history.push("/login");
            } else {
                alert('회원가입 에러', data.message);
            }
        } else {
            alert('정보를 정확히 입력해주세요.');
        }
    }

    return (
        <Container>
            <SignupBox>
                <SignupTitle>Sign-up</SignupTitle>
                <SignupForm onSubmit={handleSubmit}>
                    <label>Username</label>
                    <DupBox>
                        <FormInput className="usernameInput" type="text" onChange={onChange} onBlur={checkValid}  title="username" />
                        <DupCheckBtn className="dupCheckBtn" onClick={checkDupl}> 중복검사 </DupCheckBtn>
                    </DupBox>
                    <ErrorMessage className="username">{error.username}</ErrorMessage>
                    <label>Password</label>
                    <FormInput type="password" onChange={onChange} onBlur={checkValid} title="password" />
                    <ErrorMessage className="password">{error.password}</ErrorMessage>
                    <label>Confirm Password</label>
                    <FormInput type="password" onBlur={checkPassword} title="password2" />
                    <ErrorMessage className="password2"></ErrorMessage>
                    <label>Name</label>
                    <FormInput type="text" onChange={onChange} onBlur={checkValid} title="name" />
                    <ErrorMessage className="name">{error.name}</ErrorMessage>
                    <label>Email</label>
                    <DupBox>
                        <FormInput className="emailInput" type="email" onChange={onChange} onBlur={checkValid} title="email" />
                        <DupCheckBtn onClick={checkEmail}>메일인증</DupCheckBtn>
                    </DupBox>
                    <CodeBox className="codebox">
                        <CodeTitle>인증번호</CodeTitle>
                        <CodeIput className="codeValue" type="text" />
                        <CodeBtn onClick={checkCode}>확인</CodeBtn>
                    </CodeBox>
                    <ErrorMessage className="email">{error.email}</ErrorMessage>
                    <FormBtn>회원가입</FormBtn>
                </SignupForm>
            </SignupBox>
        </Container>
    )
};

export default Signup;