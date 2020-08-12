import React from 'react';
import requester from "../../../library/requester";
import TutorialCard from "../tutorial-card/TutorialCard";


class LandingPage extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            recentTutorials: [],
        };
    }

    render() {
        const tutorialList = this.renderTutorialList(this.state.recentTutorials);

        return (
            <div>
                <h1>Recent Tutorials</h1>
                {tutorialList}
            </div>
        );
    }

    renderTutorialList(tutorials) {
        const tutorialList = [];
        for (let i = 0 ; i < tutorials.length; i++) {
            tutorialList.push(<TutorialCard tutorial={tutorials[i]}/>);
        }
        return tutorialList;
    }

    componentDidMount() {
        this.fetchRecentTutorials();
    }

    fetchRecentTutorials() {
        const path = `/tutorials/recent`;
        requester.GET(path).then(
            (response) => {
                this.setState({
                    recentTutorials: response.tutorials
                })
            }
        )
    }
}

export default LandingPage;