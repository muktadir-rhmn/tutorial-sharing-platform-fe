const userManager = {
    isSignedIn: () => {
        return localStorage.getItem("token") !== null;
    },

    setSignedInUser: (token, userType, userID, userName) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userType", userType);
    },

    removeSignedInUser: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");
        localStorage.removeItem("userType");
    },

    getUserName: () => localStorage.getItem("userName"),
}

export default userManager;