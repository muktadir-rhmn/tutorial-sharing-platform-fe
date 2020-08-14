import React from 'react';
import CommentBox from "./CommentBox";
import requester from "../../../library/requester";

import Comment from "./Comment";
import Reply from "./Reply";

class Comments extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            comments: [],
            replyTo: null,
        };
    }

    render() {
        if (this.props.lessonID == null) return <div/>;

        const commentList = this.renderComments(this.state.comments, this.state.replyTo);
        return (
            <div className="mt-5">
                {commentList}
                <CommentBox operation="add" itemID={this.props.lessonID} notifyNewComment={() => window.location.reload()}/>
            </div>
        );
    }

    renderComments(comments, replyTo) {
        const commentList = [];
        for(let i = 0; i < comments.length; i++) {
            const comment = <Comment key={comments[i].id} comment={comments[i]} notifyClickOnReply={(commentID) => this.setState({replyTo: commentID})} />;
            commentList.push(comment);

            const replyList = this.renderReplyList(comments[i].id, comments[i].replies);
            commentList.push(replyList);

            if (replyTo === comments[i].id) {
                const replyBox = (
                    <div className="ml-5" key={comments[i].id + "-reply"}>
                        <CommentBox operation="reply" itemID={replyTo} notifyNewComment={() => window.location.reload()}/>
                    </div>
                )
                commentList.push(replyBox);
            }
        }
        return commentList;
    }

    renderReplyList(commentID, replies) {
        const replyList = [];
        for (let i = 0; i < replies.length; i++) {
            replyList.push(<Reply key={replies[i].id} parentID={commentID} reply={replies[i]}/>);
        }

        return (
            <div key={commentID+"replies"} className="ml-5">
                {replyList}
            </div>
        )
    }

    componentDidMount() {
        if (this.props.lessonID !== null) this.fetchComments(this.props.lessonID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) this.fetchComments(this.props.lessonID);
    }

    fetchComments(lessonID) {
        if (lessonID == null) {
            this.setState({
                comments: [],
            })
            return;
        }

        const path = `/comments/${lessonID}`;
        requester.GET(path).then(
            (response) => {
                this.setState({
                    comments: response.comments,
                })
            },
            (error) => {
                console.error(error);
            }
        )
    }
}

export default Comments;