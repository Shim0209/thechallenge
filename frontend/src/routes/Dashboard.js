import React from 'react';
import { useLocation } from 'react-router';
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
    const location = useLocation();

    console.log('전달받은 데이터',location);

    return (
        <Container>Dashboard</Container>
    )
};

export default Dashboard;