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
    },

    requestSignUp: (name, email, password, successCallback, failureCallback) => {
        const data = {
            name: name,
            email: email,
            password: password
        }

        requester.POST("/user/sign-up", data).then(
            (response) => {
                console.log(response);

                successCallback(response);
            },
            (error) => {
                console.error(error);

                failureCallback(error);
            }
        )
    }
}

export default userManager;