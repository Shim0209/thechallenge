import React from 'react';
import styled from "styled-components";
import Nav from 'components/Nav';

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

const Challenge = (props) => {
    return (
        <Container>
            <LeftBox>
                챌린지 이미지
                
                챌린지 정보
                챌린지 일정표
                챌린지 과제 진행표
                챌린지 참가자
                챌린지 안내사항

                으로 갈수있는 네비게이션 만들기
                여기서 클릭하면 RightBox에서 정보 출력
                컴포넌트로 만들기
            </LeftBox>
            <RightBox>
                참여자들이 챌린지 들어와서 보는 실제 페이지
                챌린지 정보
                참여자 정보
                과제 정보
                일정 정보
                안내문
                등등 
            </RightBox>
        </Container>
    )
}

export default Challenge;