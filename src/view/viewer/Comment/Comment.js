import React from 'react';
import time from "../../../library/time";

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
            </div>
        );
    }
}

export default Comment;