import React from 'react';
import requester from "../../../../library/requester";
import './style.css'
import {Link} from "react-router-dom";
import adminPaths from "../../AdminPaths";

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
                <h1><span className="badge badge-light"> Contents</span> {tutorial.name}</h1>
                <div className="d-flex justify-content-end m-2">
                    <button className="btn btn-success" onClick={event => this.addChapter(event) }>
                        <i className="fa fa-plus" aria-hidden="true"></i> Add Chapter</button>
                </div>
                <table id={tutorial.id} className="table table-hover">
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
                    <td><span className="badge badge-success">Chapter</span> {chapters[i].name}</td>
                    <td>
                        <Link to={adminPaths.addLessonPath(this.state.tutorial.id, chapters[i].id)} className={"btn btn-outline-success"}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Add Lesson</Link>
                        <button className="btn btn-outline-success" onClick={(event => this.updateChapter(chapters[i]))}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                    </td>
                </tr>
            )
            contentRows.push(chapterRow);

            this.renderAndPushLessonRows(contentRows, chapters[i].id, chapters[i].lessons);
        }
        return contentRows;
    }

    renderAndPushLessonRows(contentRows, chapterID, lessons) {
        for (let i = 0; i < lessons.length; i++) {
            const lessonRow = (
                <tr className="lesson-row" id={lessons[i].id} key={lessons[i].id}>
                    <td>{lessons[i].name}</td>
                    <td>
                        <Link to={adminPaths.updateLessonPath(this.state.tutorial.id, chapterID, lessons[i].id)} className={"btn btn-outline-success"}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Link>
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

    updateChapter(chapter) {
        const newChapterName = prompt("Enter new chapter name:", chapter.name);
        if(newChapterName === null || newChapterName === "") return;

        const path = `/tutorials/${this.state.tutorial.id}/${chapter.id}`;
        requester.POST(path, {name: newChapterName}).then(
            (response) => {
                alert("Updated");

                const chapters = this.state.tutorial.chapters;
                for(let i = 0; i < chapters.length; i++){
                    if (chapters[i].id === chapter.id) {
                        chapters[i].name = newChapterName;
                    }
                }
                this.setState({});
            }
        )
    }
}

export default TutorialContents;