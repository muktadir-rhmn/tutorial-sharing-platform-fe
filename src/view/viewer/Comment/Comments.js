import React from 'react';
import CommentBox from "./CommentBox";
import requester from "../../../library/requester";

import Comment from "./Comment";

class Comments extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            comments: [],
        };
    }

    render() {
        if (this.props.lessonID == null) return <div/>;

        const commentList = this.renderComments(this.state.comments);
        return (
            <div className="mt-5">
                {commentList}
                <CommentBox lessonID={this.props.lessonID}/>
            </div>
        );
    }

    renderComments(comments) {
        const commentList = [];
        for(let i = 0; i < comments.length; i++) {
            const comment = <Comment key={comments[i].id} comment={comments[i]}/>;

            commentList.push(comment);
        }
        return commentList;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) this.fetchComments(this.props.lessonID);
    }

    fetchComments(lessonID) {
        if (lessonID == null) return;

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