import React,{useState} from 'react';
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
    background-color: #fafafa;
    width: 100%;
    height: calc(100vh - 120px);

    display: flex;
    justify-content: center;
    align-items: center;
`;
const CreateBox = styled.div`
    background-color: #fafafa;
    box-shadow: 0px 0px 3px 1px gray;
    width: 350px;
    height: 630px;
    border-radius:20px;
    padding:0 40px 20px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-space-around;
    align-items: center;
    padding: 30px;
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
    &:nth-child(5){
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }
`;
const FormLabel = styled.label`
    margin-top: 10px;
`;
const FileLabel = styled.label`
    display: inline-block;
    background-color: white;
    padding: 10px;
    border: 2px solid gray;
    border-radius: 5px;
    cursor: pointer;
`;
const FormDateBox = styled.div`
    
`;
const DateBox = styled.div`
    border: 2px solid gray;
    border-radius: 5px;
    height: 150px;
    overflow: scroll;
    box-sizing: border-box;
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



const ChallengeCreate = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const [dateRange, setDateRange] = useState([]);
    const [assignment, setAssignment] = useState([]);

    // 당일 날짜까지 비활성화 하기 위함
    let tMinDate = new Date();
    tMinDate.setDate(tMinDate.getDate()+1);

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
                    day:day,
                    option:option
                }
            ])
        } else {
            assignment.map(obj => {
                if(obj.id === id){
                    obj.option = option
                }
            })
        }
    }

    console.log(startDate);
    console.log(endDate);
    console.log(dateRange);
    console.log(assignment);

    return (
        <Container>
            <CreateBox>
                <CreateTitle>New Challenge</CreateTitle>
                <CreateForm>
                        <FormLabel>Challenge Title</FormLabel>
                        <FormInput type="text" />
                        <FormLabel>Challenge Image</FormLabel>
                        <FileLabel htmlFor="fileInput">챌린지의 대표 이미지 등록</FileLabel>
                        <FormInput type="file" id="fileInput" />
                        <FormLabel>Challenge Date Range</FormLabel>
                        <FormDateBox>
                            <DatePicker 
                                minDate={tMinDate}
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                            />
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
            </CreateBox>
        </Container>
    )
}

export default ChallengeCreate;