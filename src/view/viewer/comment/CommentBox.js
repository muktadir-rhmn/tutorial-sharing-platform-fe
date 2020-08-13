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
                    <button className="btn btn-success" onClick={(event) => this.addComment(event)}>
                        <i className="fa fa-paper-plane" aria-hidden="true"></i> Comment</button>
                </div>
            </div>
        );
    }

    addComment(event) {
        const commentBodyText = getCommentBox(event.target);

        const commentBody = commentBodyText.value;

        let path;
        let requestBody;
        if (this.props.operation === "add") {
            path = `/comments`;
            requestBody = {
                lessonID: this.props.itemID,
                commentBody: commentBody,
            }
        } else if (this.props.operation === "reply") {
            path = `/comments/${this.props.itemID}/add-reply`;
            requestBody = {
                commentBody: commentBody
            }
        }

        console.log(requestBody);
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