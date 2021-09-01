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

const Dashboard = (props) => {
    return (
        <Container>Dashboard</Container>
    )
};

export default Dashboard;