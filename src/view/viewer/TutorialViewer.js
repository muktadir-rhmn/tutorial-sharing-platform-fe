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
            <div className="container-fluid" style={{marginTop: "150px", width: "100vw"}}>
                <div className="row">
                    <div className="col-3">
                        <div className="contents-section position-fixed" style={{minWidth: "330px"}}>
                            <Heading tutorial={this.state.tutorial}/>
                            <Contents tutorial={this.state.tutorial} curLessonID={this.props.lessonID}/>
                        </div>
                    </div>
                    <div className="col-6">
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
                    <div className="col-3">
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