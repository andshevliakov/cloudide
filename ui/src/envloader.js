const executorUrl = process.env.REACT_APP_EXECUTOR_URI || 'http://localhost:8000'

export default executorUrl

// if ('auth-token' in localStorage) {
//     const is_verified = verifyToken(localStorage.getItem('auth-token'))
//     if (!is_verified) {
//       localStorage.removeItem('auth-token')
//     }
//   }