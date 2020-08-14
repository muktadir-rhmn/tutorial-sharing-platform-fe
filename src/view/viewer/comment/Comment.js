import React from 'react';
import time from "../../../library/time";
import LikerDisliker from "./liker-disliker/LikerDisliker";

class Comment extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        const comment = this.props.comment;

        return (
            <div className="card p-3 mt-2 bg-light">
                <div className="d-flex">
                    <div><h5>{comment.commenterName}</h5></div>
                    <div className="ml-auto">{time.millisToTime(comment.createdAt)}</div>
                </div>

                <p>{comment.body}</p>

                <div className="d-flex justify-content-between">
                    <LikerDisliker commentIDPath={comment.id} nLikes={comment.nLikes}/>
                    <button className="btn btn-outline-success" onClick={(event) => this.props.notifyClickOnReply(this.props.comment.id)}>
                        <i className="fa fa-reply" aria-hidden="true"></i> Reply
                    </button>
                </div>
            </div>
        );
    }
}

export default Comment;