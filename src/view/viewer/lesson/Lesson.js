import React from 'react';
import requester from "../../../library/requester";
import userManager from "../../user/UserManager";

class Lesson extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            lesson: null,
            isDone: null,
            isFavourite: false,
        };
    }

    render() {
        if (this.state.lesson === null) return <div/>;

        let markButton = "";
        let favouriteButton = "";
        if(userManager.isSignedIn() ) {
            if (this.state.isDone !== null && !this.state.isDone) {
                markButton = <button className="btn btn-success" onClick={event => this.markAsDone(event)}><i className="fa fa-check" aria-hidden="true"></i> Mark As Done</button>;
            }

            if (this.state.isFavourite !== null){
                if (this.state.isFavourite) {
                    favouriteButton = <span style={{color: "orange"}}><i className="fa fa-star" aria-hidden="true"></i></span>
                } else {
                    favouriteButton = <span style={{color: "green"}} onClick={event => this.markAsFavourite(event)}><i className="fa fa-star-o" aria-hidden="true"></i></span>;
                }
            }
        }

        const lesson = this.state.lesson;
        return (
            <div className="card p-3">
                <h1>
                    {lesson.name}
                    {this.state.isDone ? <i className="fa fa-check" style={{color:"green"}} aria-hidden="true"></i> : ""}
                    {favouriteButton}
                </h1>
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

    markAsFavourite(event) {
        if (this.state.isFavourite) return;

        const path = `/markings/${this.props.tutorialID}/${this.props.lessonID}`;
        const data = {
            mark: "favourite",
        }

        requester.POST(path, data).then(
            (response) => {
                alert("Marked as Favourite");
                this.setState({
                    isFavourite: true,
                })
            }
        )
    }


    componentDidMount() {
        this.fetchLesson(this.props.lessonID);
        this.fetchLessonMarks(this.props.tutorialID, this.props.lessonID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) {
            this.fetchLesson(this.props.lessonID);
            this.fetchLessonMarks(this.props.tutorialID, this.props.lessonID);
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

    fetchLessonMarks(tutorialID, lessonID) {
        if (!userManager.isSignedIn()) return;

        const path = `/markings/${tutorialID}/${lessonID}/has-mark`;
        const data = {
            marks: ["done", "favourite"]
        }

        requester.POST(path, data).then(
            (response) => {
                this.setState({
                    isDone: response.hasMarks[0],
                    isFavourite: response.hasMarks[1],
                })
            }
        )
    }

}

export default Lesson;