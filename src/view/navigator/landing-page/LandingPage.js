import React from 'react';
import requester from "../../../library/requester";
import TutorialCardList from "../tutorial-card/TutorialCardList";


class LandingPage extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            recentTutorials: [],
        };
    }

    render() {

        return (
            <div>
                <h1>Recent Tutorials</h1>
                <TutorialCardList tutorials={this.state.recentTutorials}/>
            </div>
        );
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