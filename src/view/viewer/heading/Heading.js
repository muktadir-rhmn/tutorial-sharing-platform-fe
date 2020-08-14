import React from 'react';
import Rater from "./Rater";

class Heading extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const tutorial = this.props.tutorial;
        if (tutorial == null) return <div />;

        return (
            <div className="heading">
                <h3>{tutorial.name}</h3>
                <h5 className="text-center text-secondary">{tutorial.authorName}</h5>
                <Rater tutorialID={tutorial.id}/>
            </div>
        );
    }


}

export default Heading;