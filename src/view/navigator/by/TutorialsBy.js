import React from 'react';
import requester from "../../../library/requester";
import TutorialCardList from "../tutorial-card/TutorialCardList";

class TutorialsBy extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            tutorials: [],
        };
    }

    render() {
        return (
            <div className="mt-5">
                <TutorialCardList tutorials={this.state.tutorials} />
            </div>
        );
    }

    componentDidMount() {
        this.fetchTutorialsOfCategory(this.props.by, this.props.itemID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemID !== prevProps.itemID) this.fetchTutorialsOfCategory(this.props.by, this.props.itemID);
    }

    fetchTutorialsOfCategory(by, itemID) {
        const path = `/tutorials`;
        const queryParams = {};
        queryParams[by+"ID"] = itemID;
        requester.GET(path, queryParams).then(
            (response) => {
                this.setState({
                    tutorials: response.tutorials,
                })
            }
        )
    }
}

export default TutorialsBy;