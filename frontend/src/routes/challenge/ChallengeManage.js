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
    width: 85%;
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 1fr));
    overflow: scroll;
`;
const FormBox = styled.div`
    background-color: #fafafa;
    padding: 5px;
    overflow: scroll;
`;
const ShowBox = styled.div`
    background-color: #f4f4f4;
    padding: 5px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ErrorStatus = styled.div``;
const ChallengeForm = styled.div`
    display: flex;
    flex-direction: column;
`;
const FormData = styled.div`
    display: flex;
`;
const MainImage = styled.img`
    width: 50%;
    border-radius: 10px;
`;
const DataBox = styled.div`
    padding: 5px;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const DataItem = styled.div`
    display: grid;
    gap: 2px;
`;
const DataLabel = styled.label`
    font-size: 15px;
    font-weight: 600;
`;
const DataInput = styled.input`
    border: none;
    padding: 5px;
`;
const DataBtn = styled.a`
    border: 2px solid black;
    font-weight: 600;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    &:hover{
        background-color: black;
        color: white;
    }
`;
const TagBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(50px, 1fr));
    text-align: center;
    gap: 5px;
    overflow-x: scroll;
`;
const TagItem = styled.div`
    color: #0094f6;
    border: 1px solid #0094f6;
    border-radius: 5px;
    overflow-x: scroll;
    padding: 5px 0;
    &:hover{
        background-color: #0094f6;
        color: white;
    }
`;
const ParaBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;
const ParaHeader = styled.div`
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    padding: 5px;
    background-color: black;
    color: white;
`;
const ParaBody = styled.div`
    
`;
const ParaItem = styled.div`
    display: grid;
    gap: 2px;
`;
const ParaLabel = styled.label`
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    padding: 5px;
`;
const ParaInput = styled.input`
    border: none;
    padding: 5px;
`;
const ParaTextarea = styled.textarea`
    border: none;
    padding: 5px;
    width: inherit;
`;
const ParaBtn = styled.a`
    border: 1px solid black;
    font-weight: 600;
    padding: 5px 0;
    text-align: center;
    &:hover{
        background-color: black;
        color: white;
    }
`;
const AssignBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;
const AssignHeader = styled.div`
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    padding: 5px;
    background-color: black;
    color: white;
    margin-bottom: 5px;
`;
const AssignBody = styled.div`
    display: flex;
    flex-direction: column;
`;
const AssignItem = styled.a`
    
`;
const KeyBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
`;


const ChallengeManage = (props) => {
    const [challenge, setChallenge] = useState({
        assignments:null,
        available:null,
        createDate:null,
        endDate:null,
        host:null,
        id:null,
        imageByte:null,
        paragraphs:null,
        startDate:null,
        status:null,
        tags:null,
        title:null,
        participants:null,
        loading:true,
        error:null
    });
    const {id} = useParams(); // 서버에서 받을때 사용
    const location = useLocation(); 

    const getData = async() => {
        await challengeApi.challenge(id)
        .then((result) => {
            console.log('성공 result',result);
            setChallenge({
                ...challenge,
                assignments:result.data.data.assignments,
                available:result.data.data.available,
                createDate:result.data.data.createDate,
                endDate:result.data.data.endDate,
                host:result.data.data.host,
                id:result.data.data.id,
                imageByte:result.data.data.imageByte,
                paragraphs:result.data.data.paragraphs,
                startDate:result.data.data.startDate,
                status:result.data.data.status,
                tags:result.data.data.tags,
                title:result.data.data.title,
                participants:result.data.data.participants,
                loading:false
            })
        })
        .catch((error) => {
            console.log('에러',error.response);
            if(error.response.data.code === -1){
                // setState({
                //     ...state,
                //     loading: false,
                //     error: error.response.data.data
                // })
                setChallenge({
                    ...challenge,
                    loading: false,
                    error: error.response.data.data
                })
            }
        })
    }
    const init = () => {
        console.log('init');
        if(location.state === undefined){
            // axios로 해당 챌린지 정보 받아와야함.
            console.log('ccc');
            getData();
        } else {
            // 받아온 데이터를 바로 사용
            console.log('받아온 데이터', location.state);
            setChallenge({
                ...challenge,
                assignments:location.state.data.data.assignments,
                available:location.state.data.data.available,
                createDate:location.state.data.data.createDate,
                endDate:location.state.data.data.endDate,
                host:location.state.data.data.host,
                id:location.state.data.data.id,
                imageByte:location.state.data.data.imageByte,
                paragraphs:location.state.data.data.paragraphs,
                startDate:location.state.data.data.startDate,
                status:location.state.data.data.status,
                tags:location.state.data.data.tags,
                title:location.state.data.data.title,
                participants:location.state.data.data.participants,
                loading:false
            })
        }
    }
    useEffect(init,[]);

    console.log('data',challenge);

    const onParaSave = async(e) => {
        // console.log('e',e.target);
        const title = document.getElementById('paraTitle').value;
        const text = document.getElementById('paraText').value;
        // console.log('title',title);
        // console.log('text',text);
        if(title !== null && text !==null){
            const paragraphs = {"title":title, "text":text, "challengeId":challenge.id};

            // 데이터베이스에 적용
            const result = await challengeApi.createParagraphs(paragraphs);
            console.log('paragraphs 생성 결과',result);
            // 저장한 paragraphs 객체를 받아서 state에 담기
            const tempParagraphs = challenge.paragraphs.concat({"id":result.data.data.id, "title":result.data.data.title, "text":result.data.data.text});
            setChallenge({
                ...challenge,
                paragraphs:tempParagraphs
            })
        } else {
            alert('비어있는 칸을 모두 채워주세요.');
        }
    }

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
                    challenge.loading 
                    ? 
                    <Loader />
                    : 
                    <FormBox>
                    {
                        challenge.error !== null 
                        ? 
                        <ErrorStatus>{challenge.error}</ErrorStatus>
                        :
                        <ChallengeForm>
                            <FormData>
                                <MainImage src={`data:image/jpeg;base64,${challenge.imageByte}`} />
                                <DataBox>
                                    <DataItem>
                                        <DataLabel>타이틀 </DataLabel>
                                        <DataInput type="text" value={challenge.title}></DataInput>
                                    </DataItem>
                                    <DataItem>
                                        <DataLabel>상태 </DataLabel>
                                        <DataInput type="text" value={challenge.status} disabled></DataInput>
                                    </DataItem>
                                    <DataItem>
                                        <DataLabel>참가자 </DataLabel>    
                                        <DataInput type="text" value={`${challenge.participants === null ? '0' : challenge.participants.length}명`} disabled></DataInput>
                                    </DataItem>
                                    <DataItem>
                                        <DataLabel>시작일 </DataLabel>
                                        <DataInput type="text" value={challenge.startDate.substr(0,10)} disabled></DataInput>
                                    </DataItem>
                                    <DataItem>
                                        <DataLabel>마감일 </DataLabel>
                                        <DataInput type="text" value={challenge.endDate.substr(0,10)} disabled></DataInput>
                                    </DataItem>
                                    <DataItem>
                                        <DataLabel>태그</DataLabel>
                                        <DataInput type="text" placeholder="태그 추가" />
                                    </DataItem>
                                    <TagBox>
                                            {challenge.tags.map((tag,index) => 
                                                <TagItem key={index}>{tag.tag}</TagItem>
                                            )}
                                    </TagBox>
                                    <DataBtn>저장하기</DataBtn>
                                </DataBox>
                            </FormData>
                            <ParaBox>
                                <ParaHeader>소개 및 정보 등록</ParaHeader>
                                <ParaBody>
                                            
                                    <ParaItem>
                                        <ParaLabel>타이틀</ParaLabel>    
                                        <ParaInput id="paraTitle" type="text" placeholder="타이틀을 작성하세요" />
                                    </ParaItem>
                                    <ParaItem>
                                        <ParaLabel>내용</ParaLabel>    
                                        <ParaTextarea id="paraText" type="text" placeholder="내용을 작성하세요" rows="7" />
                                    </ParaItem>
                                </ParaBody>
                                <ParaBtn onClick={onParaSave}>저장하기</ParaBtn>
                            </ParaBox>
                            <AssignBox>
                                <AssignHeader>과제</AssignHeader>
                                <AssignBody>
                                {challenge.assignments.map((assign,index) => 
                                    <KeyBox key={index}>
                                        <AssignItem>
                                            <div>{assign.submitDate.substr(0,10)+' -> 제출방식 : '+assign.type}</div>
                                            <ParaItem>
                                                <ParaLabel>타이틀</ParaLabel>    
                                                <ParaInput type="text" placeholder="타이틀을 작성하세요" />
                                            </ParaItem>
                                            <ParaItem>
                                                <ParaLabel>내용</ParaLabel>    
                                                <ParaTextarea type="text" placeholder="내용을 작성하세요" rows="7" />
                                            </ParaItem>
                                        </AssignItem>
                                        <ParaBtn>저장하기</ParaBtn>
                                        {assign.type === 'quiz' && 
                                            <>
                                                <ParaItem>
                                                    <ParaLabel>문제</ParaLabel>    
                                                    <ParaInput type="text" placeholder="문제를 입력하세요." />
                                                </ParaItem>
                                                <ParaItem>
                                                    <ParaLabel>정답</ParaLabel>    
                                                    <ParaInput type="text" placeholder="정답을 입력하세요." />
                                                </ParaItem>
                                                <ParaItem>
                                                    <ParaLabel>최소패스점수</ParaLabel>    
                                                    <ParaInput type="text" placeholder="최소 패스 점수를 입력하세요." />
                                                </ParaItem>
                                                <ParaItem>
                                                    <ParaLabel>객관식문항</ParaLabel>    
                                                    <ParaInput type="text" placeholder="객관식 문항을 입력하세요." />
                                                </ParaItem>
                                                <ParaBtn>문항추가하기</ParaBtn>
                                                <ParaBtn>저장하기</ParaBtn>
                                            </>
                                        }
                                    </KeyBox>
                                )}
                                </AssignBody>

                            </AssignBox>
                        </ChallengeForm>
                    }
                    </FormBox>
                }
                    <ShowBox>
                        <div>챌린지 미리보기 + 챌린지 소개 및 정보</div>
                        <div>과제 미리보기 + 과제 소개 및 정보</div>
                        <div>수정완료버튼 눌러야지 데이터 베이스에 저장</div>
                        <div>저장하기 누르면 state에 값 저장됨. 저장된 값은 미리보기에 x 버튼을 눌러 삭제 가능. 데이터베이스 적용은 수정완료버튼을 눌러야함.</div>
                    </ShowBox>
                </RightBox>
            </Container>
        </>
    )
}

export default ChallengeManage;