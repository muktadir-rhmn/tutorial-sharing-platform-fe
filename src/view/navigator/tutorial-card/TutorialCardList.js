import React from 'react';
import TutorialCard from "./TutorialCard";

class TutorialCardList extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        const tutorialList = this.renderTutorialList(this.props.tutorials);

        return (
            <div className="d-flex">
                {tutorialList}
            </div>
        );
    }

    renderTutorialList(tutorials) {
        if (tutorials == null || tutorials.length === 0) return "";

        const tutorialList = [];
        for (let i = 0 ; i < tutorials.length; i++) {
            tutorialList.push(<TutorialCard key={tutorials[i].id} tutorial={tutorials[i]}/>);
        }
        return tutorialList;
    }
}

export default TutorialCardList;