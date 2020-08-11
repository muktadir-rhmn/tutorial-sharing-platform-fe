import React from 'react';
import TextBox from "../../../form/TextBox";
import TextArea from "../../../form/TextArea";
import requester from "../../../../library/requester";
import Button from "../../../form/Button";

class CreateTutorial extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            rootCategory: [],
        };
    }

    render() {
        console.log(this.state.rootCategory);

        return (
            <div>
                <h1>Create Tutorial</h1>
                <div>
                    <TextBox label="Name"/>
                    <TextArea label="Description" />

                    <Button label="Create" onClick={(event) => this.createTutorial(event)}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchHierarchy();
    }

    fetchHierarchy() {
        const path = `/hierarchy`;
        requester.GET(path).then(
            (rootCategory) => {
                this.setState({
                    rootCategory: rootCategory
                })
            }
        )
    }

    createTutorial(event) {

    }
}

export default CreateTutorial;