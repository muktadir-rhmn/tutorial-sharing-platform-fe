import React from 'react';

import './style.css';
import requester from "../../../../library/requester";
import userManager from "../../../user/UserManager";

class LikerDisliker extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            hasLiked: null,
            hasDisliked: null,
        };
    }

    render() {
        if (!userManager.isSignedIn()) return "";
        return (
            <div className="liker-disliker">
                <span  onClick={event => this.likeDislike(this.props.commentIDPath, "like")}>
                    <i className={`fa fa-thumbs-up ${this.state.hasLiked === true ? "active" : ""}`} aria-hidden="true"></i></span>
                {this.props.nLikes}
                <span  onClick={event => this.likeDislike(this.props.commentIDPath, "dislike")}>
                    <i className={`fa fa-thumbs-down ${this.state.hasDisliked === true ? "active" : ""}`} aria-hidden="true"></i></span>
            </div>
        );
    }

    likeDislike(commentIDPath, evaluation) {
        if (this.state.hasLiked === null || this.state.hasDisliked === null) return;
        if ((evaluation === "like" && this.state.hasLiked) || (evaluation === "dislike" && this.state.hasDisliked)) return;

        const path = `/evaluations/${commentIDPath}`;
        const data = {
            evaluation: evaluation,
            itemType: "comment",
        }

        requester.POST(path, data).then(
            (response) => {
                alert(evaluation + " done");

                this.setState({
                    hasLiked: evaluation === "like",
                    hasDisliked: evaluation === "dislike",
                })
            }
        )
    }

    componentDidMount() {
        this.fetchMyLikeDislike(this.props.commentIDPath);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.commentIDPath !== this.props.commentIDPath) this.fetchMyLikeDislike(this.props.commentIDPath);
    }

    //todo: optimise this. this will be called for every comments. But can make it a single call
    fetchMyLikeDislike(commentIDPath) {
        if (!userManager.isSignedIn()) return;

        const path = `/evaluations/my`;
        const data = {
            itemIDs: [commentIDPath]
        }

        requester.POST(path, data).then(
            (response) => {
                const evaluations = response.evaluations;

                const hasLiked = evaluations[0] === "like";
                const hasDisliked = evaluations[0] === "dislike";

                this.setState({
                    hasDisliked: hasDisliked,
                    hasLiked: hasLiked,
                })
            }
        )
    }
}

export default LikerDisliker;