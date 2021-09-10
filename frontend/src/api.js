import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})
// // 인증이 필요한 요청에 사용
// const authConfig = {
//     headers: {
//         'Authorization': localStorage.getItem('AccessToken')
//     }
// }

// // json 전송시 사용
// const jsonConfig = {
//     headers: {
//         'Content-Type': 'Application/json',
//         'Authorization': localStorage.getItem('AccessToken')
//     }
// }
export const authApi = {
    // 회원가입
    signup:(form) => api.post("auth/signup", form),
    login:(data) => api.post("login", data),

    // 아이디(username) 중복체크
    duplication:(username) => api.get("auth/duplication", {
        params: {
            username: username
        }
    }),
    // 이메일 인증
    emailcheck:(email) => api.get("auth/email", {
        params: {
            email: email
        }
    }),
}
export const utilApi = {
    // 이미지 업로드
    imageUpload:(form, config) => api.post("image", form,config),
}
export const challengeApi = {
    create:(form, config) => api.post("challenge/create",form,config),
    challenge:(id) => api.get(`challenge/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('AccessToken')
    }}),
    myChallenge:() => api.get('challenge/mychallenge',{
        headers: {
            'Authorization': localStorage.getItem('AccessToken')
    }}),
    createParagraphs:(form) => api.post("paragraphs/create",form,{
        headers: {
            'Authorization': localStorage.getItem('AccessToken')
    }}),
    challengeUpdate:(form, config) => api.post("challenge/update",form,config),
    createAssignParagraphs:(form) => api.post("paragraphs/assign/create",form,{
        headers: {
            'Authorization': localStorage.getItem('AccessToken')
    }}),
    createQuiz:(form) => api.post("assignment/quiz/create",form,{
        headers: {
            'Authorization': localStorage.getItem('AccessToken')
    }}),
}
