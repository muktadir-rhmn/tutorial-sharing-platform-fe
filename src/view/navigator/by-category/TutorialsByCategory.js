import React from 'react';
import requester from "../../../library/requester";
import TutorialCardList from "../tutorial-card/TutorialCardList";

class TutorialsByCategory extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            tutorials: [],
        };
    }

    render() {
        return <TutorialCardList tutorials={this.state.tutorials} />;
    }

    componentDidMount() {
        this.fetchTutorialsOfCategory(this.props.categoryID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.categoryID != prevProps.categoryID) this.fetchTutorialsOfCategory(this.props.categoryID);
    }

    fetchTutorialsOfCategory(categoryID) {
        const path = `/tutorials`
        requester.GET(path, {categoryID: categoryID}).then(
            (response) => {
                this.setState({
                    tutorials: response.tutorials,
                })
            }
        )
    }
}

export default TutorialsByCategory;