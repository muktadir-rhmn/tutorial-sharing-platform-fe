import React from 'react';
import {Link} from "react-router-dom";
import viewerPaths from "../ViewerPaths";
import requester from "../../../library/requester";
import userManager from "../../user/UserManager";

class Contents extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            doneLessonIDs: null
        };
    }

    render() {
        const tutorial = this.props.tutorial;

        if (tutorial == null) return <div />;

        const contents = this.renderContents(tutorial.id, tutorial.chapters, this.state.doneLessonIDs);
        return (
            <div className="contents mt-3">
                <ul>{contents}</ul>
            </div>
        );
    }

    renderContents(tutorialID, chapters, doneLessonIDs) {
        const contents = [];
        for (let i = 0; i < chapters.length; i++) {
            const lessonList = this.renderLessonList(tutorialID, chapters[i].id, chapters[i].lessons, doneLessonIDs);
            const chapter = (
                <li key={chapters[i].id}>
                    <h5 className="chapter-name" >{chapters[i].name}</h5>
                    <ul className="lesson-list">{lessonList}</ul>
                </li>
            )
            contents.push(chapter);
        }
        return contents;
    }

    renderLessonList(tutorialID, chapterID, lessons, doneLessonIDs) {
        const lessonList = [];
        for (let i = 0; i < lessons.length; i++) {
            const doneIcon = isDone(lessons[i].id, doneLessonIDs)?  <i className="fa fa-check" style={{color:"green"}} aria-hidden="true"></i>: "";
            const lessonPath = viewerPaths.lessonPath(tutorialID, chapterID, lessons[i].id);
            const lesson = (
                <li key={lessons[i].id} className={this.props.curLessonID === lessons[i].id ? "active" : ""}>
                    <Link to={lessonPath}> {doneIcon} {lessons[i].name}</Link></li>
            )
            lessonList.push(lesson);
        }
        return lessonList;

        function isDone(lessonID, doneLessonIDs) {
            return doneLessonIDs !== null && doneLessonIDs.indexOf(lessonID) !== -1;
        }
    }

    componentDidMount() {
        if (this.props.tutorial === null) return;
        this.fetchDoneLessonIDs(this.props.tutorial.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tutorial === null) return;

        if(prevProps.tutorial == null || this.props.tutorial.id !== prevProps.tutorial.id) this.fetchDoneLessonIDs(this.props.tutorial.id);
    }

    fetchDoneLessonIDs(tutorialID) {
        if (!userManager.isSignedIn()) return;

        const path = `/markings/${tutorialID}/done`;

        requester.GET(path).then(
            (response) => {
                this.setState({
                    doneLessonIDs: response.lessonIDs,
                })
            }
        )
    }
}

export default Contents;