import React from 'react';
import {useParams} from "react-router-dom";
import TutorialViewer from "./TutorialViewer";

function ViewerMain(props) {
    let { tutorialID, chapterID, lessonID } = useParams();
    if (typeof chapterID === "undefined") chapterID = null;
    if (typeof lessonID === "undefined") lessonID = null;

    return <TutorialViewer tutorialID={tutorialID} chapterID={chapterID} lessonID={lessonID}/>;
}
export default ViewerMain;