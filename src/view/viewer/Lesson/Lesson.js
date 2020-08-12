import React from 'react';
import requester from "../../../library/requester";

class Lesson extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            lesson: null,
        };
    }

    render() {
        if (this.state.lesson === null) return <div></div>;

        const lesson = this.state.lesson;
        return (
            <div className="card p-3">
                <h1>{lesson.name}</h1>
                {lesson.body}
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lessonID !== this.props.lessonID) this.fetchLesson(this.props.lessonID);
    }

    fetchLesson(lessonID) {
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
}

export default Lesson;