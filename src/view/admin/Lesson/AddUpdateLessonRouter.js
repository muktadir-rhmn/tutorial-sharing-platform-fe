import React from 'react';
import AddUpdateLesson from "./AddUpdateLesson";
import {useParams} from "react-router-dom";

function AddUpdateLessonRouter(props) {
    let { tutorialID, chapterID, lessonID } = useParams();
    if (typeof lessonID === "undefined") lessonID = null;

    return <AddUpdateLesson operation={props.operation} tutorialID={tutorialID} chapterID={chapterID} lessonID={lessonID}/>;
}

export default AddUpdateLessonRouter;