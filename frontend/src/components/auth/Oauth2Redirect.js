import React from 'react';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';

const Oauth2Redirect = ({location}) => {
    const query = queryString.parse(location.search);

    const accessToken = query.Authorization;
    const jwtToken = accessToken.replace('Bearer','');
    const decoded = jwt_decode(jwtToken); 
    const expiredTime = decoded.exp+'000';

    localStorage.setItem('AccessToken', query.Authorization);
    localStorage.setItem('ExpiredTime', expiredTime);
    
    return (
        <h1>Oauth2Redirect</h1>
    )
};
            
  

export default Oauth2Redirect;