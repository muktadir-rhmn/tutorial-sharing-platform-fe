import React from 'react';
import {useParams} from "react-router-dom";
import TutorialViewer from "./TutorialViewer";

function ViewerMain(props) {
    let { tutorialID } = useParams();
    console.log("ViewerMain:: tutorialID" + tutorialID);

    return <TutorialViewer tutorialID={tutorialID}/>;
}
export default ViewerMain;