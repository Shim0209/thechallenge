import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from 'components/Nav';
import { Helmet } from 'react-helmet';
import { challengeApi } from 'api';
import Loader from 'components/Loader';
// 자신이 운영하는 챌린지 리스트를 출력하는 페이지
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

const ManageBox = styled.div`
    padding: 5px;
    overflow-x: scroll;
`;
const Table = styled.table`
    text-align: center;
    width: 100%;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const HTr = styled.tr`
    border-bottom: 1px solid gray;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;
const Tr = styled.tr`
    border-bottom: 1px solid gray;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    &:hover{
        background-color: black;
        color: white;
    }
`;

const Th = styled.th`
    font-size: 15px;
    font-weight: 700;
    padding: 10px;
    width: 120px;
    display: flex;
    justify-content: center;
`;
const Td = styled.td`
    padding: 10px;
    width: 120px;
    overflow-x: scroll;
    align-self: center;
`;
const SLink = styled(Link)`
    font-weight: 500;
    cursor: pointer;
`;


const Manage = (props) => {
    const [state, setState] = useState({
        data:null,
        loading:true,
        error:null
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = async() => {
        await challengeApi.myChallenge()
        .then((result) => {
            console.log('성공',result);
            setState({
                ...state,
                data: result.data.data,
                loading:false
            })
        })
        .catch((error) => {
            console.log('실패',error);
            setState({
                ...state,
                error:error,
                loading:false
            })
        })
        
    }

    useEffect(getData, [])

    console.log('state',state);

    return (
        <>
            <Helmet>
                <title>챌린지 운영</title>
            </Helmet>
            <Container>
                <LeftBox>
                    <Nav />
                </LeftBox>
                <RightBox>
                {
                    state.loading
                    ?
                    <Loader />
                    :
                    <>
                        {
                            state.data.length === 0
                            ? 
                            <div>운영중인 챌린지가 존재하지 않습니다.</div>
                            :
                            <ManageBox>
                                <Table>
                                    <Thead>
                                        <HTr>
                                            <Th>ID</Th>
                                            <Th>Title</Th>
                                            <Th>Status</Th>
                                            <Th>D-day</Th>
                                            <Th>Participants</Th>
                                        </HTr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            state.data.map((challenge,index) => 
                                                <SLink key={index} to={`/challenge/manage/${challenge.id}`}>
                                                    <Tr>
                                                        <Td>{challenge.id}</Td>
                                                        <Td>{challenge.title}</Td>
                                                        <Td>{challenge.status}</Td>
                                                        <Td>{parseInt(challenge.startDate.substr(8,10)) - parseInt(new Date().toISOString().substr(8,10))+'일'}</Td>
                                                        <Td>{challenge.participants != null ? challenge.participants.length : '0'}</Td>
                                                    </Tr>
                                                </SLink>
                                            )
                                        }                    
                                    </Tbody>
                                </Table>
                            </ManageBox>
                        }
                    </>
                }
                </RightBox>
            </Container>
        </>
    )
}

export default Manage;
