import React from 'react';
import {Link} from "react-router-dom";
import viewerPaths from "../../viewer/ViewerPaths";

import './style.css';

class TutorialCard extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {

        };
    }

    render() {
        const tutorial = this.props.tutorial;

        return (
            <div className="tutorial-card card">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={viewerPaths.tutorialPath(tutorial.id)}>{tutorial.name}</Link>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{tutorial.authorName}</h6>
                    <p className="card-text">{tutorial.description}</p>
                </div>
            </div>
        );
    }
}

export default TutorialCard;