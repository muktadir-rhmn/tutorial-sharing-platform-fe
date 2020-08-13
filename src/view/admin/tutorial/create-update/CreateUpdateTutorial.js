import React from 'react';
import TextBox from "../../../form/TextBox";
import TextArea from "../../../form/TextArea";
import requester from "../../../../library/requester";
import Button from "../../../form/Button";
import formDataCollector from "../../../../library/formDataCollector";
import HierarchyCombobox from "../../hierarchy/HierarchyCombobox";

class CreateUpdateTutorial extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tutorialToUpdate: null,
        };
    }

    render() {
        const isUpdate = this.props.isUpdate;

        if (isUpdate && this.state.tutorialToUpdate === null) return <div/>;

        const operationName = isUpdate ? "Update" : "Create";
        const tutorialName = isUpdate ? this.state.tutorialToUpdate.name : "";
        const tutorialDescription = isUpdate ? this.state.tutorialToUpdate.description : "";
        const tutorialCategoryID = isUpdate  ? this.state.tutorialToUpdate.categoryID : "";

       return (
            <div>
                <h1>{operationName} Tutorial</h1>
                <div id="create-update-tutorial-form">
                    <TextBox id="name" label="Name" value={tutorialName}/>
                    <TextArea id="description" label="Description" value={tutorialDescription}/>
                    <HierarchyCombobox id="categoryID" label="Category" includeRoot={false} value={tutorialCategoryID}/>
                    <Button label={operationName} onClick={(event) => this.createUpdateTutorial(event)}/>
                </div>
            </div>
        );
    }

    createUpdateTutorial(event) {
        const data = formDataCollector.collect("create-update-tutorial-form");

        const pathFromRoot = data.categoryID.split(":");
        data.categoryID = pathFromRoot[pathFromRoot.length - 1];

        let path = this.props.isUpdate ? `/tutorials/${this.state.tutorialToUpdate.id}` : `/tutorials`;

        requester.POST(path, data).then(
            (response) => {
                alert("Tutorial added with ID ");
            }
        )
    }

    componentDidMount() {
        if (this.props.isUpdate) this.fetchTutorial(this.props.tutorialID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isUpdate && this.props.tutorialID !== prevProps.tutorialID)this.fetchTutorial(this.props.tutorialID);
    }

    fetchTutorial(tutorialID) {
        const path = `/tutorials/${tutorialID}/meta-data`;
        requester.GET(path).then(
            (tutorialMetaData) => this.setState({tutorialToUpdate: tutorialMetaData})
        )
    }
}

export default CreateUpdateTutorial;