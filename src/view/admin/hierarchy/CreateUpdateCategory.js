import React from 'react';
import HierarchyCombobox from "./HierarchyCombobox";
import TextBox from "../../form/TextBox";
import Button from "../../form/Button";
import requester from "../../../library/requester";
import formDataCollector from "../../../library/formDataCollector";

class CreateUpdateCategory extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        const isUpdate = this.props.isUpdate;

        const operationName = isUpdate ? "Update" : "Create";
        const categoryName = isUpdate ? this.props.name : "";

        let parentCategoryID = "";
        if (isUpdate) {
            const path = this.props.categoryIDPath.split(":");
            parentCategoryID = path[path.length - 2];
        }

        return (
            <div>
                <h1>{operationName} Category</h1>
                <div id="create-update-category-form">
                    <TextBox id="name" label="Name" value={categoryName}/>
                    <HierarchyCombobox id="parentIDPath" label="Parent Category" includeRoot={true} value={parentCategoryID}/>
                    <Button label={operationName} onClick={(event) => this.createCategory(event)}/>
                </div>
            </div>
        );
    }

    createCategory(event) {
        const data = formDataCollector.collect("create-update-category-form");
        if (data.parentIDPath === this.props.categoryIDPath) {
            alert("A category cannot be the parent of its own");
            return;
        }
        data.parentIDPath = data.parentIDPath.split(":");

        let path = "";
        if (this.props.isUpdate) {
            path = `/hierarchy/update-category`;
            data.idPath = this.props.categoryIDPath.split(":");
        } else {
            path = `/hierarchy/create-category`;
        }

        requester.POST(path, data).then(
            (response) => {
                alert("Tutorial added/updated");
            }
        )
    }
}

export default CreateUpdateCategory;