import React from 'react';
import CommentBox from "./CommentBox";
import requester from "../../../library/requester";

class Comment extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            comments: [],
        };
    }

    render() {
        const commentList = this.renderComments(this.state.comments);
        return (
            <div>
                {commentList}
                <CommentBox lessonID={this.props.lessonID}/>
            </div>
        );
    }

    renderComments(comments) {
        const commentList = [];
        for(let i = 0; i < comments.length; i++) {
            const comment = (
                <div className="comment" key={comments[i].id}>
                    <div className="commenter-name">{comments[i].commenterName}</div>
                    <div className="comment-body">{comments[i].body}</div>
                </div>
            )

            commentList.push(comment);
        }
        return commentList;
    }

    componentDidMount() {
        this.fetchComments(this.props.lessonID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) this.fetchComments(this.props.lessonID);
    }

    fetchComments(lessonID) {
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

export default Comment;