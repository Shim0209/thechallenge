import jwt_decode from 'jwt-decode';
/**
 * 페이지 전환시 JWT 인증을 진행
 * 1. accessToken이 있는가?  
 *  - 로컬스토리지에서 가져와서 검사
 * 2. JWT Token의 만료시간이 지났는가?
 *  - 정상적인 토큰일 경우 만료시간 검사
 * @returns 
 *  - JWT 인증 성공 : true
 *  - JWT 인증 실패 : false
 */
const verifJwt = (props) => {
    // 1
    const accessToken = localStorage.getItem('AccessToken');
    if(accessToken == null){
        return false;
    }

    // 2
    // - jwt 토큰 추출
    const jwtToken = accessToken.replace('Bearer','');
    // - jwt 디코드
    const decoded = jwt_decode(jwtToken); 
    console.log('디코딩된 jwt',decoded);
    // - jwt 만료 예정시간  
    const expiredTime = decoded.exp+'000';
    // - 비교를 위한 현재 시간 가져오기
    const currentTime = new Date().getTime();
    // - 만료시간 비교
    if(expiredTime <= currentTime) {
        return false;
    }

    // jwt 검증 성공
    return true;
}

export default verifJwt;