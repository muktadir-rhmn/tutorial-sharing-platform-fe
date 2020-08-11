import React from 'react';
import requester from "../../../../library/requester";
import './style.css'
import {Link} from "react-router-dom";

class TutorialContents extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            tutorial: null
        };
    }

    componentDidMount() {
        this.fetchTutorial(this.props.tutorialID);
    }

    fetchTutorial(tutorialID) {
        const path = `/tutorials/${tutorialID}`;
        requester.GET(path).then(
            (tutorial) => {
                this.setState({
                    tutorial: tutorial,
                })
            }
        )
    }

    render() {
        if (this.state.tutorial == null) return <div/>;

        const tutorial = this.state.tutorial;
        const contentRows = this.renderContentRows(tutorial.chapters);
        return (
            <div>
                <h1>Contents: {tutorial.name}</h1>
                <button onClick={event => this.addChapter(event) }>Add Chapter</button>
                <table id={tutorial.id} onClick={event => this.handleTableClick(event)} className="table table-hover">
                    <tbody>
                    {contentRows}
                    </tbody>
                </table>
            </div>
        );
    }

    renderContentRows(chapters) {
        const contentRows = [];
        for (let i = 0; i < chapters.length; i++) {
            const chapterRow = (
                <tr key={chapters[i].id} id={chapters[i].id} className="chapter-row">
                    <td>Chapter: {chapters[i].name}</td>
                    <td>
                        <Link to={this.addLessonPath(this.state.tutorial.id, chapters[i].id)} className={"btn btn-outline-success"}>Add Lesson</Link>
                    </td>
                </tr>
            )
            contentRows.push(chapterRow);

            this.renderAndPushLessonRows(contentRows, chapters[i].id, chapters[i].lessons);
        }
        return contentRows;
    }

    addLessonPath(tutorialID, chapterID) {
        return `/admin/tutorials/${tutorialID}/${chapterID}/add-lesson`;
    }

    updateLessonPath(tutorialID, chapterID, lessonID) {
        return `/admin/tutorials/${tutorialID}/${chapterID}/${lessonID}/update`;
    }

    renderAndPushLessonRows(contentRows, chapterID, lessons) {
        for (let i = 0; i < lessons.length; i++) {
            const lessonRow = (
                <tr className="lesson-row" id={lessons[i].id} key={lessons[i].id}>
                    <td>{lessons[i].name}</td>
                    <td>
                        <Link to={this.updateLessonPath(this.state.tutorial.id, chapterID, lessons[i].id)} className={"btn btn-outline-success"}>Edit</Link>
                    </td>
                </tr>
            );

            contentRows.push(lessonRow);
        }
    }

    addChapter(event) {
        const chapterName = prompt("Enter chapter name");

        const path = `/tutorials/${this.state.tutorial.id}/add-chapter`;
        const requestData = {
            name: chapterName,
        }
        requester.POST(path, requestData).then(
            (response) => {
                alert("Chapter Added");
                window.location.reload();
            }
        )
    }

    handleTableClick(event) {

    }
}

export default TutorialContents;