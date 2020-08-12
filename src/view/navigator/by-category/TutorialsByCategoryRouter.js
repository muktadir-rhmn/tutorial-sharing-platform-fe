import React from 'react';
import {useParams} from "react-router-dom";
import TutorialsByCategory from "./TutorialsByCategory";

function TutorialsByCategoryRouter() {
    let { categoryID } = useParams();

    return <TutorialsByCategory categoryID={categoryID}/>;
}

export default TutorialsByCategoryRouter;