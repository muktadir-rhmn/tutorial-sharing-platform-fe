const userManager = {
    isSignedIn: () => {
        return localStorage.getItem("token") !== null;
    },

    setUser: (token, userType, userID, userName) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userType", userType);
    },
}

export default userManager;