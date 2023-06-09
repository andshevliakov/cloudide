const version1ServerRoutes = '/api/v1'

const codeRoutes = () => {
    return version1ServerRoutes + '/code';
}

const packageRoutes = () => {
    return version1ServerRoutes + '/package';
}

const userRoutes = () => {
    return version1ServerRoutes + '/user'
}

const tokenRoutes = () => {
    return version1ServerRoutes + '/token'
}

const routes = {
    codeRoute: {
        runCode: codeRoutes() + '/run',
    },
    packageRoute: {
        installPackage: packageRoutes() + '/install',
    },
    userRoute: {
        verifyUser: userRoutes() + '/verify',
        createUser: userRoutes() + '/create',
        createK8sUser: userRoutes() + '/createK8s',
        getUser: userRoutes() + '/info',
        updateUser: userRoutes() + '/update',
        verifyExecutorSpec: userRoutes() + '/verifySpec',
        addExecutorSpec: userRoutes() + '/executorSpec',
    },
    tokenRoute: {
        generateToken: tokenRoutes() + '/generate',
        verifyToken: tokenRoutes() + '/verify',
    },
}

export default routes