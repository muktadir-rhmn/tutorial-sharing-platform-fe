import React from 'react';
import HierarchyCombobox from "./HierarchyCombobox";
import TextBox from "../../form/TextBox";
import Button from "../../form/Button";
import requester from "../../../library/requester";
import formDataCollector from "../../../library/formDataCollector";

class CreateUpdateCategory extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
        };
    }

    render() {

        return (
            <div>
                <h1>Create Category</h1>
                <div id="create-update-category-form">
                    <TextBox id="name" label="Name"/>
                    <HierarchyCombobox id="pathFromRoot" label="Parent Category" includeRoot={true}/>
                    <Button label="Create" onClick={(event) => this.createCategory(event)}/>
                </div>
            </div>
        );
    }

    createCategory(event) {
        const data = formDataCollector.collect("create-update-category-form");
        data.pathFromRoot = data.pathFromRoot.split(":");
        console.log(data);

        const path = `/hierarchy/create-category`;
        requester.POST(path, data).then(
            (response) => {
                alert("Tutorial added with ID " + response.categoryID);
            }
        )
    }
}

export default CreateUpdateCategory;