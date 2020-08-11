import React from 'react';
import {useParams} from "react-router-dom";
import TutorialContents from "./TutorialContents";

function TutorialContentsRouter (props){
    let { tutorialID } = useParams();

    return <TutorialContents tutorialID={tutorialID}/>;

}

export default TutorialContentsRouter;