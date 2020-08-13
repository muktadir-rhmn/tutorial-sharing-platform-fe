import React from 'react';
import {Link} from "react-router-dom";
import viewerPaths from "../ViewerPaths";

class Contents extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const tutorial = this.props.tutorial;

        if (tutorial == null) return <div />;

        const contents = this.renderContents(tutorial.id, tutorial.chapters);
        return (
            <div className="contents-section position-fixed">
                <div className="heading">
                    <h3>{tutorial.name}</h3>
                    <h5 className="text-center text-secondary">{tutorial.authorName}</h5>
                </div>
                <div className="contents mt-3">
                    <ul>{contents}</ul>
                </div>
            </div>
        );
    }

    renderContents(tutorialID, chapters) {
        const contents = [];
        for (let i = 0; i < chapters.length; i++) {
            const lessonList = this.renderLessonList(tutorialID, chapters[i].id, chapters[i].lessons);
            const chapter = (
                <li key={chapters[i].id}>
                    <h5 className="chapter-name" >{chapters[i].name}</h5>
                    <ul className="lesson-list">{lessonList}</ul>
                </li>
            )
            contents.push(chapter);
        }
        console.log(contents);
        return contents;
    }

    renderLessonList(tutorialID, chapterID, lessons) {
        const lessonList = [];
        for (let i = 0; i < lessons.length; i++) {
            const lessonPath = viewerPaths.lessonPath(tutorialID, chapterID, lessons[i].id);
            const lesson = (
                <li key={lessons[i].id}><Link to={lessonPath}>{lessons[i].name}</Link></li>
            )
            lessonList.push(lesson);
        }
        return lessonList;
    }
}

export default Contents;