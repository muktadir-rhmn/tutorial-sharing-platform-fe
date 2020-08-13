import React from 'react';
import {useParams} from "react-router-dom";
import CreateUpdateTutorial from "./CreateUpdateTutorial";

function UpdateTutorialRouter (props){
    let { tutorialID } = useParams();

    return <CreateUpdateTutorial isUpdate={true} tutorialID={tutorialID}/>;
}

export default UpdateTutorialRouter;