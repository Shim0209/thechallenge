import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

// 이미지 업로드시 사용
const imageUploadConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('AccessToken')
    }
}
// 인증이 필요한 요청에 사용
const authConfig = {
    headers: {
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
    imageUpload:(form) => api.post("image", form, imageUploadConfig),
}
export const challengeApi = {

}
