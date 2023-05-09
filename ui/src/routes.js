const version1ServerRoutes = '/api/v1'

const codeRoutes = () => {
    return version1ServerRoutes + '/code';
}

const packageRoutes = () => {
    return version1ServerRoutes + '/package';
}

const routes = {
    codeRoute: {
        runCode: codeRoutes() + '/run',
    },
    packageRoute: {
        installPackage: packageRoutes() + '/install',
    },
    user_route: version1ServerRoutes + '/user',
    token_route: version1ServerRoutes + '/token',
}

export default routes