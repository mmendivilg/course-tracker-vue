export default {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authUserName: state => state.user_name,
}