import React from 'react';
import {useParams} from "react-router-dom";
import TutorialsBy from "./TutorialsBy";

function TutorialsByRouter() {
    let { by,  itemID} = useParams();

    console.log(by + " " + itemID);
    return <TutorialsBy by={by} itemID={itemID}/>;
}

export default TutorialsByRouter;