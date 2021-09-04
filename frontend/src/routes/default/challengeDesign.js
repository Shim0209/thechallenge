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

const 이름입력 = (props) => {
    return (
        <Container>
            <LeftBox>
                <Nav />
            </LeftBox>
            <RightBox>
                
                내용 입력

            </RightBox>
        </Container>
    )
}

export default 이름입력;