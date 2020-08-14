import React from 'react';
import {Link} from "react-router-dom";
import viewerPaths from "../../viewer/ViewerPaths";

import './style.css';
import navigatorPaths from "../NavigatorPaths";

class TutorialCard extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {

        };
    }

    render() {
        const tutorial = this.props.tutorial;

        let rating = "";
        if (tutorial.avgRating !== null) rating = <div className="rating"><i className="fa fa-star" aria-hidden="true"></i> {tutorial.avgRating}</div>;

        return (
            <div className="tutorial-card card">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={viewerPaths.tutorialPath(tutorial.id)}>{tutorial.name}</Link>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        by <Link to={navigatorPaths.tutorialsByAuthorPath(tutorial.authorID)}>{tutorial.authorName}</Link>
                    </h6>
                    <div className="description">{tutorial.description}</div>
                    {rating}
                </div>
            </div>
        );
    }
}

export default TutorialCard;