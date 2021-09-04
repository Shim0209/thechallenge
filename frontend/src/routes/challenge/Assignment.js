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

const Assignment = (props) => {
    return (
        <Container>
            <LeftBox>
                <Nav />
            </LeftBox>
            <RightBox>
                챌린지 과제 페이지
            </RightBox>
        </Container>
    )
}

export default Assignment;