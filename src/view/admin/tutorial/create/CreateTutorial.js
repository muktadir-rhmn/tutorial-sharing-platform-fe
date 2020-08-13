import React from 'react';
import TextBox from "../../../form/TextBox";
import TextArea from "../../../form/TextArea";
import requester from "../../../../library/requester";
import Button from "../../../form/Button";
import formDataCollector from "../../../../library/formDataCollector";
import HierarchyCombobox from "../../hierarchy/HierarchyCombobox";

class CreateTutorial extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            rootCategory: null,
        };
    }

    render() {
        console.log(this.state.rootCategory);

       return (
            <div>
                <h1>Create Tutorial</h1>
                <div id="create-tutorial-form">
                    <TextBox id="name" label="Name"/>
                    <TextArea id="description" label="Description" />
                    <HierarchyCombobox id="categoryID" label="Category" includeRoot={false}/>
                    <Button label="Create" onClick={(event) => this.createTutorial(event)}/>
                </div>
            </div>
        );
    }

    createTutorial(event) {
        const data = formDataCollector.collect("create-tutorial-form");

        const p = data.categoryID.split(":");
        data.categoryID = p[p.length - 1];

        const path = `/tutorials`;

        requester.POST(path, data).then(
            (response) => {
                alert("Tutorial added with ID " + response.tutorialID);
            }
        )
    }
}

export default CreateTutorial;