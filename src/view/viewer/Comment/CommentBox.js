import React from 'react';
import userManager from "../../user/UserManager";
import Button from "../../form/Button";
import requester from "../../../library/requester";

class CommentBox extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        if (!userManager.isSignedIn()) return <div/>;

        return (
            <div className="comment-box">
                <textarea className="comment-body"/> <br/>
                <Button label="Comment" onClick={(event) => this.addComment(event)}/>
            </div>
        );
    }

    addComment(event) {
        const commentBodyText = getCommentBox(event.target);

        const commentBody = commentBodyText.value;
        const path = `/comments`;

        const requestBody = {
            lessonID: this.props.lessonID,
            commentBody: commentBody,
        }
        requester.POST(path, requestBody).then(
            (response) => {
                alert("Successfully Added comment with id " + response.commentID);
            },
            (error) => {
                console.error(error);
            }
        );
        commentBodyText.value = "";

        function getCommentBox(buttonElement) {
            let t = buttonElement.parentElement;
            while (!t.classList.contains("comment-box")) t = t.parentElement;

            return t.getElementsByClassName("comment-body")[0];
        }
    }
}

export default CommentBox;