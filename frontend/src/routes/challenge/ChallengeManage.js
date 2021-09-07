import React,{useState,useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import styled from "styled-components";
import Nav from 'components/Nav';
import { challengeApi } from 'api';
import { Helmet } from 'react-helmet';
import Loader from 'components/Loader';
// 특정 챌린지의 정보를 등록하는 페이지

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
`;
const LeftBox = styled.div`
    padding: 10px 5px 5px 5px;
    width: 15%;
    border-right: 1px solid gray;
`;
const RightBox = styled.div`
    padding: 10px 5px 5px 5px;
    width: 85%;
`;
const FormBox = styled.div``;
const ShowBox = styled.div``;

const Image = styled.img`
    width: 500px;
`;

const ChallengeManage = (props) => {
    const [state, setState] = useState({
        challenge: null,
        error: null,
        loading: true
    })
    // 로직이 2개가됨.
    // 1. 생성후 리다이렉틑되어서 오는 경우 -> 해당 챌린지 정보가 history에 담겨있음
    // 2. manage에서 특정 챌린지 클릭한 경우 -> 해당 챌린지 정보를 서버에서 받아와야함.
    
    // history내부 데이터 존재 여부를 가장 먼저 검사해야함
    // 데이터 있으면
    //      바로 화면에 표시
    // 데이터 없으면
    //      서버에서 받아서 화면에 표시

    const {id} = useParams(); // 서버에서 받을때 사용
    const location = useLocation(); 
    const getData = async() => {
        await challengeApi.challenge(id)
        .then((result) => {
            console.log('성공',result);
            setState({
                ...state,
                loading:false,
                challenge: result.data.data
            })
        })
        .catch((error) => {
            console.log('에러',error.response.data);
            if(error.response.data.code === -1){
                setState({
                    ...state,
                    loading: false,
                    error: error.response.data.data
                })
            }
        })
    }
    const init = () => {
        if(location.state === undefined){
            // axios로 해당 챌린지 정보 받아와야함.
            console.log('ccc');
            getData();
        } else {
            // 받아온 데이터를 바로 사용
            setState({
                ...state,
                loading: false,
                challenge: location.state.data.data
            })
        }
    }
    useEffect(init,[]);


    console.log('스테이트 데이터',state);

    return (
        <>
            <Helmet>
                <title>챌린지 관리</title>
            </Helmet>
            <Container>
                <LeftBox>
                    <Nav />
                </LeftBox>
                <RightBox>
                {
                    state.loading 
                    ? <Loader />
                    : 
                    <>
                    {
                        state.error !== null 
                        ? <div>{state.error}</div>
                        :
                        <>
                            데이터 정상
                        {/* <div>{state.challenge.title}</div>

                            <div>{state.challenge.status}</div>
                            <p>
                                <Image src={`http://localhost:8080/images/${state.challenge.mainImageUrl}`} />
                            </p>
                            <div>{state.challenge.startDate}</div>
                            <div>{state.challenge.endDate}</div>
                            {state.challenge.assignments.map(assign => {
                                <div>{assign.type}</div>
                            })}
                            {state.challenge.tags.map(tag => {
                                <div>{tag.tag}</div>
                            })} */}
                        </>
                    }
                    </>
                }
                </RightBox>
            </Container>
        </>
    )
}

export default ChallengeManage;