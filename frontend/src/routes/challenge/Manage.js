import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from 'components/Nav';
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
const Tr = styled.tr`
    border-bottom: 1px solid gray;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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
const RBtn = styled.a`
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: red;
    color: white;
    
`;
const BBtn = styled.a`
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #0094f6;
    color: white;
`;
const SLink = styled(Link)`
    font-weight: 500;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    &:hover{
        background-color: black;
        color: white;
    }
`;


const Manage = (props) => {
    return (
        <Container>
            <LeftBox>
                <Nav />
            </LeftBox>
            <RightBox>
                <ManageBox>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Title</Th>
                                <Th>Status</Th>
                                <Th>D-day</Th>
                                <Th>Assignment</Th>
                                <Th>Paragraph</Th>
                                <Th>Participants</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${1}`}>
                                        1
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${2}`}>
                                        2
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${3}`}>
                                        3
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${4}`}>
                                        4
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${5}`}>
                                        5
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${1}`}>
                                        1
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${1}`}>
                                        1
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <SLink to={`/challenge/manage/${13}`}>
                                        13
                                    </SLink>
                                </Td>
                                <Td>스프링부트 Rest 서버 기초완성 2주반 다함께 차차차</Td>
                                <Td>대기</Td>
                                <Td>34일</Td>
                                <Td>
                                    <RBtn>등록전</RBtn>
                                </Td>
                                <Td>
                                    <BBtn>등록완료</BBtn>
                                </Td>
                                <Td>0</Td>
                            </Tr>
                            
                        </Tbody>
                    </Table>
                </ManageBox>

            </RightBox>
        </Container>
    )
}

export default Manage;