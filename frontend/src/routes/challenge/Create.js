import React,{useState} from 'react';
import { useHistory } from 'react-router';
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { challengeApi } from 'api';
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
const CContainer = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CreateBox = styled.div`
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;
    width: 520px;
    height:600px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    overflow: scroll;
    padding: 0 50px;
    border-radius:10px;
`;
const CLeftBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 500px;
    margin-top: 450px;
    margin-bottom: 40px;
`;
const CRightBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 500px;
`;
const CreateTitle = styled.div`
    font-size: 35px;
    font-weight: 600px;
    font-style: italic;
    margin-bottom: 20px;
`;
const CreateForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
`;
const FormInput = styled.input`
    height: 35px;
    border: 2px solid gray;
    border-radius: 5px;
    text-align: center;
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
const FormLabel = styled.label`
    margin-top: 10px;
`;
const PreviewBox = styled.div`
    border-left: 2px solid gray;
    border-right: 2px solid gray;
    width: inherit;
    height: inherit;
    overflow: scroll;
`;
const PreviewImg = styled.img`
    width: inherit;
`;
const FileLabel = styled.label`
    display: inline-block;
    background-color: white;
    padding: 10px;
    border: 2px solid gray;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
`;
const TagInput = styled.input`
    height: 35px;
    border: 2px solid gray;
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
`;
const TagBox = styled.div`
    width: inherit;
    height: 78px;
    border: 2px solid gray;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow-y: scroll;
    padding: 5px;
`;
const TagItemBox = styled.div`
    /* grid 방식 */
    display: grid;
    grid-template-columns: repeat(5, minmax(30px, 1fr));
    grid-row: 20px;
    padding: 10px;
    text-align: center;
    gap: 2px;
`;
const TagItem = styled.div`
    cursor: pointer;
    padding: 5px;
    border: 1px solid #0094f6;
    border-radius: 5px;
    color: #0094f6;
    overflow-x: scroll;
    &:hover{
        background-color: #0094f6;
        border: 1px solid #0094f6;
        color: white;
    }
`;
const FormDateBox = styled.div`
    display: flex;
    border: 2px solid gray;
    border-radius: 5px;
    height: inherit;
`;
const DateBox = styled.div`
    height: 265px;
    overflow: scroll;
    overflow-y: scroll;
    box-sizing: border-box;
    width: 200px;
    padding: 5px;
    font-size: 11px;
`;
const DateItem = styled.div`
    display: flex;
    align-items: center;
`;
const DateCheckbox = styled.input`
    margin-right: 10px;
`;
const DateSelect = styled.select`
    margin-left: 10px;
    option {

    }
`;
const CreateBtn = styled.div`
    cursor: pointer;
    border: 2px solid #0094f6;
    color: #0094f6;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    padding: 5px;
    text-align: center;
    &:hover{
        background-color: #0094f6;
        color: white;
    }
`;
const ChallengeCreate = (props) => {
    const history = useHistory();
    // challenge
    const [state, setState] = useState({
        title:null,
        image:null
    })
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    // assignment 
    const [dateRange, setDateRange] = useState([]);
    const [assignment, setAssignment] = useState([]);
    const [tag, setTag] = useState([]);
    // 당일 날짜까지 비활성화 하기 위함
    let tMinDate = new Date();
    tMinDate.setDate(tMinDate.getDate()+1);
    // 날짜 format 변경 함수
    const formatDate = (current_datetime)=>{
        let formatted_date = current_datetime.getFullYear() + 
                            "-" + 
                            ((current_datetime.getMonth() + 1) > 9 ? (current_datetime.getMonth() + 1) : '0'+(current_datetime.getMonth() + 1)) + 
                            "-" + 
                            (current_datetime.getDate() > 9 ? current_datetime.getDate() : '0'+current_datetime.getDate()) + 
                            " " + 
                            (current_datetime.getHours() > 9 ? current_datetime.getHours() : '0'+current_datetime.getHours()) + 
                            ":" + 
                            (current_datetime.getMinutes() > 9 ? current_datetime.getMinutes() : '0'+current_datetime.getMinutes()) + 
                            ":" + 
                            (current_datetime.getSeconds() > 9 ? current_datetime.getSeconds() : '0'+current_datetime.getSeconds());
        return formatted_date;
    }
    let subjectList = [];
    const subjectHandler = (start, end) => {
        const sDate = new Date(start);
        const eDate = new Date(end);
        
        while(sDate.getDate() !== eDate.getDate()+1 || sDate.getMonth() !== eDate.getMonth()){
            subjectList.push(new Date(sDate));
            const nextDate = sDate.getDate()+1;
            sDate.setDate(nextDate);
        }
        setDateRange(subjectList);
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        // 당일 날짜가 start에 포함된 경우 end날짜를 start에 넣어준다.
        // 당일 날짜를 비활성화 하기 위함
        if(dates[0].getDate() === new Date().getDate()){
            setStartDate(end);    
            // 챌린저 저장 버튼 비활성화 유지
        } else {
            setStartDate(start);
            setEndDate(end);
            if(end !== null) {
                subjectHandler(start, end);
            }
            // 챌린저 저장 버튼 활성화 변경
        }
    }
    /* 체크박스 true시 셀렉트박스 활성화 */
    const selectHandler = (e) => {
        const id = e.target.id.replace('c-','');
        if(e.target.checked === true){
            document.getElementById('s-'+id).disabled = false;
        } else {
            document.getElementById('s-'+id).disabled = true;
            // useState 해당 객체 삭제
            setAssignment(
                assignment.filter((v) => v.id !== id)
            )
            // 셀렉트박스 초기화
            document.getElementById('s-'+id).value = false;
        }
    }
    /* 셀렉트박스에서 옵션 선택시 useState에 저장 -> challengeAssignment 객체생성시 사용 */
    const assignmentHandler = (e) => {
        const id = e.target.id.replace('s-','');
        const day = document.getElementById('v-'+id).value;
        const option =  e.target.value;
        // useState 저장방식 -> id, day, option
        let sw = false;
        // eslint-disable-next-line array-callback-return
        assignment.map(obj => {
            if(obj.id === id){
                sw = true;
            }
        })
        if(!sw){
            setAssignment([
                ...assignment,
                {
                    id:id,
                    day:formatDate(new Date(day)),
                    option:option
                }
            ])
        } else {
            // eslint-disable-next-line array-callback-return
            assignment.map(obj => {
                if(obj.id === id){
                    obj.option = option
                }
            })
        }
    }
    const onSaveTitle = (e) => {
        setState({
            ...state,
            title: e.target.value
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
        setState({
            ...state,
            image: imageData
        })
    }
    const onSaveTag = (e) => {
        if(e.key === 'Enter'){
            const inputTag = e.target.value;
            let dup = false;
            // eslint-disable-next-line array-callback-return
            tag.map((tag) => {
                if(tag.tag === inputTag){
                    dup = true;
                }
            })
            if(!dup){
                setTag([
                    ...tag,
                    {
                        tag:inputTag
                    }
                ])
    
                e.target.value = null;
            }
        }
    }
    const onRemoveTag = (e) => {
        setTag(
            tag.filter(tag => tag.tag !== e.target.innerHTML)
        )
    }
    const createChallenge = async(e) => {
        e.preventDefault();

        if(state.title === null || startDate === null || endDate === null || assignment === null) {
            alert("필수 입력 정보가 누락되었습니다.");
        }

        const form = new FormData();
        form.append("title", state.title);
        form.append("image", state.image);
        form.append("startDate", formatDate(startDate));
        form.append("endDate", formatDate(endDate));
        form.append("assignment", JSON.stringify(assignment));
        form.append("tag",JSON.stringify(tag));

        // 타이틀, 이미지 유효성, null 체크 만들어야함.
        const fileConfig = {
            headers: {
                'Content-Type': 'Multipart/form-data',
                'Authorization': localStorage.getItem('AccessToken')
            }
        }

        const result = await challengeApi.create(form, fileConfig);
        console.log('챌린지 생성 결과',result);
        
        // !! /challenge/manage/{id} 수정필요 + 해당 페이지 만들어야함
        if(result.data.code === 1){
            history.push({
                pathname: `/challenge/manage/${result.data.data.id}`,
                state: {
                    status: 'setChallenge',
                    data: result.data
                }
            })
        } else {
            alert('챌린지 생성 실패');
        }
    }

    return (
        <Container>
            <LeftBox>
                <Nav />
            </LeftBox>
            <RightBox>
            <CContainer>
                    <CreateBox>
                        <CLeftBox>
                            <CreateTitle>Create Challenge</CreateTitle>
                            <CreateForm>
                                <FormLabel>Challenge Title</FormLabel>
                                <FormInput onChange={onSaveTitle} type="text" name="title" />
                                <FormLabel>Challenge Tag</FormLabel>
                                <TagInput onKeyPress={onSaveTag} type="text" name="tag" />
                                <TagBox>
                                {tag.length === 0
                                ?
                                    <div>챌린지와 관련된 태그를 등록하세요.</div>
                                :
                                    <TagItemBox>
                                        {tag.map((value, index) => 
                                            <TagItem key={index} onClick={onRemoveTag}>
                                                {value.tag}
                                            </TagItem>
                                        )}
                                    </TagItemBox>
                                }
                                </TagBox>
                                <FormLabel>Challenge Date Range</FormLabel>
                                <FormDateBox>
                                    <DatePicker
                                        minDate={tMinDate}
                                        selected={startDate}
                                        onChange={onChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline />
                                    <DateBox>
                                    {dateRange.length === 0 
                                    ?
                                        <div>날짜를 선택하세요</div> 
                                    : 
                                        <div>
                                            {dateRange.map((day, index) =>
                                                <DateItem key={index} >
                                                    <DateCheckbox type="checkbox" id={'c-'+index} onChange={selectHandler} />
                                                    <div id={'d-'+index}>
                                                    {
                                                        day.getMonth() > 9
                                                        ? day.getMonth()
                                                        : '0'+day.getMonth()
                                                    }월 
                                                    {
                                                        day.getDate() > 9 
                                                        ? day.getDate() 
                                                        : '0'+day.getDate()
                                                    }일
                                                    </div>
                                                    <DateSelect disabled id={'s-'+index} onChange={assignmentHandler}>
                                                        <option value={day} hidden id={'v-'+index}>제출방식</option>
                                                        <option value="file">File제출</option>
                                                        <option value="url">Url제출</option>
                                                        <option value="quiz">Quiz제출</option>
                                                        <option value="text">Text제출</option>
                                                    </DateSelect>
                                                </DateItem>
                                                )
                                            }
                                        </div>
                                    }
                                    </DateBox>
                                </FormDateBox>
                            </CreateForm>
                        </CLeftBox>
                        <CRightBox>
                            <CreateForm>
                                <FormLabel>Challenge Image</FormLabel>
                                <FileLabel htmlFor="fileInput">챌린지의 대표 이미지 등록</FileLabel>
                                <FormInputHidden onChange={onSaveFile} type="file" name="image" id="fileInput" />
                                <PreviewBox>
                                    <PreviewImg src="https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg" id="imgPreview"></PreviewImg>
                                </PreviewBox>
                            </CreateForm>
                            <CreateBtn onClick={createChallenge}>챌린지 생성하기</CreateBtn>
                        </CRightBox>
                    </CreateBox>
                </CContainer>
            </RightBox>
        </Container>
    )
    
}
export default ChallengeCreate;