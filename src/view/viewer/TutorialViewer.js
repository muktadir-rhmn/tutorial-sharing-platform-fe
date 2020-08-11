import React from 'react';
import Contents from "./Contents";
import Lesson from "./Lesson";
import Comment from "./Comment";

class TutorialViewer extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            currentLessonID: null,
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Contents tutorialID={this.props.tutorialID} changeCurrentTutorial={(tutorialID) => this.changeCurrentTutorial()}/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col">
                                <Lesson lessonID={this.state.currentLessonID}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Comment lessonID={this.state.currentLessonID}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    changeCurrentTutorial(tutorialID) {
        this.setState({
            currentTutorialID: tutorialID
        })
    }
}

export default TutorialViewer;