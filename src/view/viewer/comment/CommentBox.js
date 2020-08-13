import React from 'react';
import userManager from "../../user/UserManager";
import requester from "../../../library/requester";

class CommentBox extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        if (!userManager.isSignedIn()) return <div/>;

        return (
            <div className="comment-box card p-2 mt-3">
                <textarea className="form-control"/>
                <div className="d-flex justify-content-end mt-1">
                    <button className="btn btn-success" onClick={(event) => this.addComment(event)}>Comment</button>
                </div>
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
                this.props.notifyNewComment();
            },
            (error) => {
                console.error(error);
            }
        );
        commentBodyText.value = "";

        function getCommentBox(buttonElement) {
            let t = buttonElement.parentElement;
            while (!t.classList.contains("comment-box")) t = t.parentElement;

            return t.getElementsByTagName("textarea")[0];
        }
    }
}

export default CommentBox;