import React from 'react';

import './contents/style.css';
import Contents from "./contents/Contents";
import Lesson from "./lesson/Lesson";
import Comments from "./comment/Comments";
import requester from "../../library/requester";
import LessonNote from "./note/LessonNote";
import Heading from "./heading/Heading";

class TutorialViewer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tutorial: null,
        };
    }

    render() {
        return (
            <div className="container" style={{marginTop: "5em"}}>
                <div className="row">
                    <div className="col-3">
                        <div className="contents-section position-fixed">
                            <Heading tutorial={this.state.tutorial}/>
                            <Contents tutorial={this.state.tutorial} curLessonID={this.props.lessonID}/>
                        </div>
                    </div>
                    <div className="col-7">
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
                    <div className="col-2">
                        <LessonNote lessonID={this.props.lessonID}/>
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