import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 120px);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChallengeCreate = (props) => {
    return (
        <Container>Create</Container>
    )
}

export default ChallengeCreate;