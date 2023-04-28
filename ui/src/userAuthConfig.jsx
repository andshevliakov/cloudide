const userAuthConfig = {
    authority: 'https://cloudide-ijrrar.zitadel.cloud/', //Replace with your issuer URL
    client_id: '211549154592227585@cloudide', //Replace with your client id
    redirect_uri: 'http://localhost:3000',
    response_type: 'code',
    scope: 'openid profile email',
    post_logout_redirect_uri: 'http://localhost:31000',
    userinfo_endpoint: 'https://cloudide-ijrrar.zitadel.cloud/oidc/v1/userinfo', //Replace with your user-info endpoint
    response_mode: 'query',
    code_challenge_method: 'S256',
};

export default userAuthConfig;
