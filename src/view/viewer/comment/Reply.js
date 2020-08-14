import React from 'react';
import time from "../../../library/time";
import LikerDisliker from "./liker-disliker/LikerDisliker";

class Reply extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        const reply = this.props.reply;

        console.log(reply)
        return (
            <div className="card p-3 mt-2">
                <div className="d-flex">
                    <div><h5>{reply.commenterName}</h5></div>
                    <div className="ml-auto">{time.millisToTime(reply.createdAt)}</div>
                </div>

                <p>{reply.body}</p>

                <LikerDisliker commentIDPath={this.props.parentID + ":" + reply.id} nLikes={reply.nLikes}/>
            </div>
        );
    }
}

export default Reply;