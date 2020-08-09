import requester from "../library/requester";

const userManager = {
    isSignedIn: () => {
        return localStorage.getItem("token") !== null;
    },

    requestSignIn: (email, password, successCallback, failureCallback) => {
        requester.POST("/user/sign-in", {email: email, password: password}).then(
            (response) => {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userID", response.userID);
                localStorage.setItem("userName", response.userName);

                successCallback(response.message);
            },
            (errorResponse) => {
                console.log(errorResponse);

                failureCallback(errorResponse.message);
            }
        );
    }
}

export default userManager;