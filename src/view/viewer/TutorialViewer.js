import React from 'react';

import './Contents/style.css';
import Contents from "./Contents/Contents";
import Lesson from "./Lesson/Lesson";
import Comments from "./Comment/Comments";
import requester from "../../library/requester";

class TutorialViewer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tutorial: null,
        };
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-3">
                        <Contents tutorial={this.state.tutorial}/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col">
                                <Lesson tutorialID={this.props.tutorialID} chapterID={this.props.chapterID} lessonID={this.props.lessonID}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Comments tutorialID={this.props.tutorialID} chapterID={this.props.chapterID} lessonID={this.props.lessonID}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchContents(this.props.tutorialID);
    }

    fetchContents(tutorialID) {
        const path = `/tutorials/${tutorialID}`;
        requester.GET(path).then(
            (tutorial) => {
                this.setState({tutorial: tutorial});
            },
            (error) => {
                console.error(error);
            }
        )
    }
}

export default TutorialViewer;