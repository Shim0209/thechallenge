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
`;
const ErrorStatus = styled.div``;
const ChallengeForm = styled.div`
    display: flex;
    flex-direction: column;
`;
const FormDataBox = styled.div`
    display: flex;
`;
const ImageBox = styled.label`
    width: 50%;
    cursor: pointer;
`;
const FormInputHidden = styled.input`
    border: 2px solid gray;
    border-radius: 5px;
    text-align: center;
    
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
    
`;
const MainImage = styled.img`
    width: 100%;
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
    
    
`;
const TagItemBox = styled.div`
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
    border: 2px solid black;
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
    border-top: 1px solid black;
    font-weight: 600;
    padding: 5px 0;
    text-align: center;
    &:hover{
        background-color: black;
        color: white;
    }
`;
const ParaBtn2 = styled.a`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    font-weight: 600;
    padding: 5px 0;
    text-align: center;
    &:hover{
        background-color: black;
        color: white;
    }
`;
const ParaDate = styled.div`
    text-align: center;
    padding: 5px;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid black;
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
`;
const AssignBody = styled.div`
    display: flex;
    flex-direction: column;
`;
const AssignItem = styled.a`
    
`;
const KeyBox = styled.div`
    border: 2px solid black;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
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
            console.log('에러',error);
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
            getData();
        } else {
            // 받아온 데이터를 바로 사용
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
    const onSaveTitle = (e) => {
        setChallenge({
            ...challenge,
            title: e.target.value
        })
    }
    const onSaveTag = (e) => {
        if(e.key === 'Enter'){
            const inputTag = e.target.value;
            e.target.value = '';
            let dup = false;
            challenge.tags.map((tag) => {
                if(tag.tag === inputTag){
                    dup = true;
                }
            })
            if(!dup){
                const tempTags = challenge.tags.concat({"id":null, "tag":inputTag});
                setChallenge({
                    ...challenge,
                    tags: tempTags
                })
            }
        }
    }
    const onRemoveTag = (e) => {
        setChallenge({
            ...challenge,
            tags: challenge.tags.filter(tag => tag.tag !== e.target.innerHTML)
        })
    }
    const onSaveFile = (e) => {
        let imageData = e.target.files[0];
        // 이미지파일인지 검사
        if(!imageData.type.match("image.*")){
            alert("이미지 파일만 등록할 수 있습니다.");
            e.target.value = null;
            return;
        }
        if(imageData.size >= 2097152){
            alert("2MB 이상의 이미지는 등록할 수 없습니다.");
            return;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("imgPreview").src = e.target.result;
        }
        reader.readAsDataURL(imageData);
        setChallenge({
            ...challenge,
            imageByte: imageData
        })
    }
    const onSaveInfo = async(e) => {
        e.preventDefault();
        // title, tags, imageByte, challengeId 값 서버로 전송 
        if(challenge.title === null){
            alert("타이틀 정보가 누락되었습니다.");
        }

        let form = new FormData();
        form.append("title", challenge.title);
        form.append("tags", JSON.stringify(challenge.tags));
        form.append("image", challenge.imageByte);
        form.append("challengeId", challenge.id);

        // 타이틀, 이미지 유효성, null 체크 만들어야함.
        const fileConfig = {
            headers: {
                'Content-Type': 'Multipart/form-data',
                'Authorization': localStorage.getItem('AccessToken')
            }
        }

        const result = await challengeApi.challengeUpdate(form,fileConfig);
        console.log('챌린지 정보변경 결과',result);
        
        // !! /challenge/manage/{id} 수정필요 + 해당 페이지 만들어야함
        if(result.data.code === 1){
            alert('챌린지 정보변경 성공');
        } else {
            alert('챌린지 정보변경 실패');
        }

    }
    const onAssignParaSave = async(e) => {
        const assignId = parseInt(e.target.id.substr(14));
        const title = document.getElementById('assignParaTitle-'+assignId).value;
        const text = document.getElementById('assignParaText-'+assignId).value;

        if(title !== null && text !==null){
            let score = null;
            const findAssign = challenge.assignments.filter(assign => assign.id === assignId);
            if(findAssign[0].type === 'quiz'){
                score = document.getElementById('assignParaScore-'+assignId).value;
                findAssign[0].passScore = score;
            }
            const assignParagraphs = {"title":title, "text":text, "assignId":assignId, "passScore":score};
            const result = await challengeApi.createAssignParagraphs(assignParagraphs);
            const tempAssignmentsPara = findAssign[0].paragraphs !== null 
                                        ? findAssign[0].paragraphs.concat({"id":result.data.data.id, "title":result.data.data.title, "text":result.data.data.text})
                                        : {"id":result.data.data.id, "title":result.data.data.title, "text":result.data.data.text};
            findAssign[0].paragraphs = tempAssignmentsPara;
            const leaveAssign = challenge.assignments.filter(assign => assign.id !== assignId);
            const tempAssignments = [...findAssign, ...leaveAssign].sort((a,b)=>a.id-b.id);
            setChallenge({
                ...challenge,
                assignments: tempAssignments
            })
        } else {
            alert('비어있는 칸을 모두 채워주세요.');
        }
    }
    const onAssignQuizSave = async(e) => {
        const assignId = parseInt(e.target.id.substr(14));
        const quiz = document.getElementById('assignQuizText-'+assignId).value;
        const answer = document.getElementById('assignQuizAnswer-'+assignId).value;
        const questionBox = document.getElementById('assignQuizQuestion-'+assignId);
        console.log('assignId', assignId);
        console.log('quiz', quiz);
        console.log('answer', answer);

        // 박스아래 생성된 input의 밸류를 전부 가져와서 객체로 만들어서 서버로 보내야함
        console.log('questionBox', questionBox.children);

        // 객관식 문항 값 추출
        let questions = [];
        let isExistAnswer = 0;
        for(var i=0; i<questionBox.children.length; i++){
            if(questionBox.children[i].tagName === 'INPUT'){
                console.log(questionBox.children[i].value);
                questions = questions !== null 
                            ? questions.concat({"answerText": questionBox.children[i].value})
                            : {"answerText": questionBox.children[i].value};
                if(questionBox.children[i].value === answer){
                    isExistAnswer += 1;
                }
            }
        }
        console.log('questions',questions);

        // question 리스트에 정답이 있는지 확인
        if(isExistAnswer === 1) {
            // 보낼 객체 만들기
            const assignmentQuiz = {"quizText":quiz, "collectAnswer":answer, "assignId":assignId, "quizAnswers":JSON.stringify(questions)};
            // DB저장
            const result = await challengeApi.createQuiz(assignmentQuiz);
            console.log('퀴즈 생성 결과', result);
            // state에 담기
            const findAssign = challenge.assignments.filter(assign => assign.id === assignId);
            const tempQuiz = findAssign[0].quiz !== null
                            ? findAssign[0].quiz.concat({"id":result.data.data.id,"quizAnswers":result.data.data.quizAnswers,"quizText":result.data.data.quizText,"collectAnswer":result.data.data.collectAnswer}) 
                            : {"id":result.data.data.id,"quizAnswers":result.data.data.quizAnswers,"quizText":result.data.data.quizText,"collectAnswer":result.data.data.collectAnswer}
            findAssign[0].quiz = tempQuiz;
            const leaveAssign = challenge.assignments.filter(assign => assign.id !== assignId);
            const tempAssignments = [...findAssign, ...leaveAssign].sort((a,b)=>a.id-b.id);
            setChallenge({
                ...challenge,
                assignments: tempAssignments
            })

            console.log('테스트 마지막',challenge);
        } else if (isExistAnswer === 0) {
            alert('객관식 문항에 정답이 없습니다.');
        } else {
            alert('객관식 문항에 한개의 정답만 존재해야 합니다.');
        }


    }
    const onCreateInputBox = (e) => {
        const assignId = parseInt(e.target.id.substr(14));
        const questionBox = document.getElementById('assignQuizQuestion-'+assignId);

        // 추가 <ParaInput type="text" placeholder="객관식 문항을 입력하세요." />
        // border: none; padding: 5px;
        var newInput = document.createElement("input");
        newInput.setAttribute("type","text");
        newInput.setAttribute("placeholder","객관식 문항을 입력하세요.");
        newInput.style.border = 'none';
        newInput.style.padding = '5px';
        questionBox.appendChild(newInput);
    }


    console.log('state 체크',challenge);

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
                            <FormDataBox>
                                <ImageBox htmlFor="fileInput">
                                    <FormInputHidden id="fileInput" onChange={onSaveFile} type="file" name="image" />
                                    <MainImage src={`data:image/jpeg;base64,${challenge.imageByte}`} id="imgPreview" />
                                </ImageBox>
                                <DataBox>
                                    <DataItem>
                                        <DataLabel>타이틀 </DataLabel>
                                        <DataInput type="text" value={challenge.title} onChange={onSaveTitle} />
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
                                        <DataInput onKeyPress={onSaveTag} type="text" placeholder="태그 추가" />
                                    </DataItem>
                                    <TagBox>
                                    {
                                        challenge.tags.length === 0
                                        ? 
                                            <div>챌린지와 관련된 태그를 등록하세요.</div>
                                        :
                                            <TagItemBox>
                                                {challenge.tags.map((tag,index) => 
                                                    <TagItem key={index} onClick={onRemoveTag}>
                                                        {tag.tag}
                                                    </TagItem>
                                                )}
                                            </TagItemBox>
                                    }
                                    </TagBox>
                                    <DataBtn onClick={onSaveInfo}>저장하기</DataBtn>
                                </DataBox>
                            </FormDataBox>
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
                                            <ParaDate>{assign.submitDate.substr(0,10)+'< type : '+assign.type+' >'}</ParaDate>
                                            <ParaItem>
                                                <ParaLabel>타이틀</ParaLabel>    
                                                <ParaInput id={`assignParaTitle-${assign.id}`} type="text" placeholder="타이틀을 작성하세요" />
                                            </ParaItem>
                                            <ParaItem>
                                                <ParaLabel>내용</ParaLabel>    
                                                <ParaTextarea id={`assignParaText-${assign.id}`} type="text" placeholder="내용을 작성하세요" rows="7" />
                                            </ParaItem>
                                            {assign.type === 'quiz' 
                                            ? 
                                            <ParaItem>
                                                <ParaLabel>최소패스점수</ParaLabel>    
                                                <ParaInput id={`assignParaScore-${assign.id}`}  type="text" placeholder={assign.passScore !== null ? assign.passScore+"점" : "최소 통과점수를 입력하세요."} />
                                            </ParaItem>
                                            : ''
                                            }
                                        </AssignItem>
                                        {assign.type === `quiz` 
                                            ? <ParaBtn2 id={`assignParaBtn-${assign.id}`} onClick={onAssignParaSave}>저장하기</ParaBtn2>
                                            :<ParaBtn id={`assignParaBtn-${assign.id}`} onClick={onAssignParaSave}>저장하기</ParaBtn>
                                        }
                                        {assign.type === 'quiz' && 
                                            <>
                                                <ParaItem>
                                                    <ParaLabel>문제</ParaLabel>    
                                                    <ParaInput id={`assignQuizText-${assign.id}`} type="text" placeholder="문제를 입력하세요." />
                                                </ParaItem>
                                                <ParaItem>
                                                    <ParaLabel>정답</ParaLabel>    
                                                    <ParaInput id={`assignQuizAnswer-${assign.id}`} type="text" placeholder="정답을 입력하세요." />
                                                </ParaItem>
                                                <ParaItem id={`assignQuizQuestion-${assign.id}`}>
                                                    <ParaLabel>객관식문항</ParaLabel>    
                                                    <ParaInput type="text" placeholder="객관식 문항을 입력하세요." />
                                                </ParaItem>
                                                <ParaBtn id={`assignQuizBtn-${assign.id}`} onClick={onCreateInputBox}>문항추가하기</ParaBtn>
                                                <ParaBtn id={`assignQuizBtn-${assign.id}`} onClick={onAssignQuizSave}>저장하기</ParaBtn>
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
                    {
                        challenge.loading
                        ? 
                            <ShowBoxLoader>Loading</ShowBoxLoader>
                        : 
                            <ShowBoxContainer>
                                <ShowChallengeInfoBox>
                                    <InfoTitle>{challenge.title}</InfoTitle>
                                    <InfoTagBox>
                                        {challenge.tags.map((tag) => 
                                            <InfoTag>{tag.tag}</InfoTag>
                                        )}
                                    </InfoTagBox>
                                    <InfoBox>
                                        <InfoItem>{challenge.status},</InfoItem>
                                        <InfoItem>D-day {parseInt(challenge.endDate.substr(8,10)) - parseInt(challenge.startDate.substr(8,10))+'일'},</InfoItem>
                                        <InfoItem>{challenge.participants.length}명 대기중</InfoItem>
                                    </InfoBox>
                                    <EnterBtn>참여하기</EnterBtn>
                                </ShowChallengeInfoBox>
                                <ShowChallengeParaBox>
                                    <ShowParaBox>
                                        {challenge.paragraphs.map(para => 
                                            <ShowPara>
                                                <ShowParaTitle>{para.title}</ShowParaTitle>
                                                <ShowParaText>{para.text}</ShowParaText>
                                            </ShowPara>
                                        )}
                                    </ShowParaBox>
                                </ShowChallengeParaBox>
                                <ShowChallengeAssignBox>
                                    <ShowAssignBox>
                                        {challenge.assignments.map(assign => 
                                            <ShowAssign>
                                                <ShowAssignDate>{assign.submitDate.substr(0,10) + '< '+assign.type+' >'}</ShowAssignDate>
                                                <ShowAssignParaBox>
                                                    {assign.paragraphs.map(para => 
                                                        <ShowAssignPara>
                                                            <ShowAssignParaTitle>{para.title}</ShowAssignParaTitle>
                                                            <ShowAssignParaText>{para.text}</ShowAssignParaText>
                                                        </ShowAssignPara>
                                                    )}
                                                    {assign.type === 'quiz' &&
                                                        <ShowAssignQuiz>
                                                            {assign.quiz.map(item => 
                                                                <ShowAssignQuizBox>
                                                                    <ShowAssignQuizText>{item.quizText}</ShowAssignQuizText>
                                                                    <ShowAssignQuizAnswerBox>
                                                                        {item.quizAnswers.map(answer =>
                                                                            <ShowAssignQuizAnswer>
                                                                                <ShowAssignQuizAnswerInPut type="checkbox" />
                                                                                <ShowAssignQuizAnswerInPutText>{answer.answerText}</ShowAssignQuizAnswerInPutText>
                                                                            </ShowAssignQuizAnswer>
                                                                        )}
                                                                    </ShowAssignQuizAnswerBox>
                                                                </ShowAssignQuizBox>
                                                            )}
                                                            <ShowAssignQuizAnswerBtn>답안제출</ShowAssignQuizAnswerBtn>
                                                        </ShowAssignQuiz>
                                                    }
                                                </ShowAssignParaBox>
                                            </ShowAssign>
                                        )}
                                    </ShowAssignBox>
                                </ShowChallengeAssignBox>
                            </ShowBoxContainer>
                    }
                        
                    </ShowBox>
                </RightBox>
            </Container>
        </>
    )
}

export default ChallengeManage;

// 미리보기
const ShowBoxLoader = styled.div``;
const ShowBoxContainer = styled.div``;
const ShowChallengeInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fade4b;
    padding: 30px 0;
    margin-bottom: 15px;
`;
const InfoTitle = styled.div`
    font-size: 25px;
    text-align: center;
    margin-bottom: 15px;
`;
const InfoTagBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-bottom: 15px;
`;
const InfoTag = styled.div`
    font-size: 15px;
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
`;
const InfoBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    color: white;
    background-color: #0096fb;
    border: 2px solid #0096fb;
    border-radius: 5px;
`;
const InfoItem = styled.div`
    padding: 5px;
`;
const EnterBtn = styled.div`
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #0096fb;
    border: 2px solid #0096fb;
    &:hover {
        background-color: #0094f6;
        color: white;
    }
`;
const ShowChallengeParaBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ShowParaBox = styled.div`
    padding: 10px 0;
`;
const ShowPara = styled.div`
    margin: 10px;
    margin-bottom: 30px;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
`;
const ShowParaTitle = styled.div`
    font-size: 25px;
    margin-bottom: 5px;
`;
const ShowParaText = styled.div`
    font-size: 13px;
    color: gray;
`;
const ShowChallengeAssignBox = styled.div`
    border-top: 2px solid black;
`;
const ShowAssignBox = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ShowAssign = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;
const ShowAssignDate = styled.div`
    text-align: center;
    font-size: 20px;
    width: 100%;
    border-bottom: 1px solid gray;
`;
const ShowAssignParaBox = styled.div`
`;
const ShowAssignPara = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
`;
const ShowAssignParaTitle = styled.div`
    font-size: 20px;
    margin-bottom: 5px;
`;
const ShowAssignParaText = styled.div`
    font-size: 13px;
    color: gray;
`;
const ShowAssignQuiz = styled.div`
`;
const ShowAssignQuizBox = styled.div`
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
`;
const ShowAssignQuizText = styled.div`
    font-size: 15px;
    margin-bottom: 5px;
`;
const ShowAssignQuizAnswerBox = styled.div`
`;
const ShowAssignQuizAnswer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
`;
const ShowAssignQuizAnswerInPut = styled.input`
`;
const ShowAssignQuizAnswerInPutText = styled.div`
`;
const ShowAssignQuizAnswerBtn = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #0094f6;
    color: #0094f6;
    &:hover{
        color: white;
        background-color: #0094f6;
    }
`;