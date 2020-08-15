import React from 'react';
import requester from "../../../library/requester";
import userManager from "../../user/UserManager";

class Lesson extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            lesson: null,
            isDone: null,
        };
    }

    render() {
        if (this.state.lesson === null) return <div/>;

        let markButton = "";
        if(userManager.isSignedIn() && !!this.state.isDone) {
            markButton =
                <button className="btn btn-success" onClick={event => this.markAsDone(event)}><i className="fa fa-check"
                                                                                                 aria-hidden="true"></i> Mark
                    As Done</button>;
        }
        const lesson = this.state.lesson;
        return (
            <div className="card p-3">
                <h1>{lesson.name} {this.state.isDone ? <i className="fa fa-check" style={{color:"green"}} aria-hidden="true"></i> : ""}</h1>
                {lesson.body}

                <div className="d-flex justify-content-end">
                    {markButton}
                </div>
            </div>
        );
    }

    markAsDone(event) {
        const path = `/markings/${this.props.tutorialID}/${this.props.lessonID}`;
        const data = {
            mark: "done",
        }

        requester.POST(path, data).then(
            (response) => {
                alert("Marked as Done");
                this.setState({
                    isDone: true,
                })
                window.location.reload();
            }
        )
    }

    componentDidMount() {
        this.fetchLesson(this.props.lessonID);
        this.fetchLessonMark(this.props.tutorialID, this.props.lessonID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) {
            this.fetchLesson(this.props.lessonID);
            this.fetchLessonMark(this.props.tutorialID, this.props.lessonID);
        }
    }

    fetchLesson(lessonID) {
        if (lessonID === null) {
            this.setState({lesson: null});
            return;
        }

        const path = `/lessons/${lessonID}`;
        requester.GET(path).then(
            (lesson) => {
                this.setState({lesson: lesson})
            },
            (error) => {
                console.error(error);
            }
        )
    }

    fetchLessonMark(tutorialID, lessonID) {
        if (!userManager.isSignedIn()) return;
        alert()
        const path = `/markings/${tutorialID}/${lessonID}/has-mark`;
        const data = {
            mark: "done"
        }

        requester.POST(path, data).then(
            (response) => {
                this.setState({
                    isDone: response.hasMark,
                })
            }
        )

    }
}

export default Lesson;