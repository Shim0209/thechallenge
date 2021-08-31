import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

// 파일 전송시 사용
const fileConfig = {
    headers: {
        'Content-Type': 'Multipart/form-data',
        'Authorization': localStorage.getItem('AccessToken')
    }
}
// 인증이 필요한 요청에 사용
const authConfig = {
    headers: {
        'Authorization': localStorage.getItem('AccessToken')
    }
}

// json 전송시 사용
const jsonConfig = {
    headers: {
        'Content-Type': 'Application/json',
        'Authorization': localStorage.getItem('AccessToken')
    }
}

export const authApi = {
    // 회원가입
    signup:(form) => api.post("auth/signup", form),

    // 아이디(username) 중복체크
    duplication:(username) => api.get("auth/duplication", {
        params: {
            username: username
        }
    }),

    login:(data) => api.post("login", data),
}
export const utilApi = {
    // 이미지 업로드
    imageUpload:(form) => api.post("image", form, fileConfig),
}
export const challengeApi = {
    create:(form) => api.post("challenge/create",form,fileConfig),
}
