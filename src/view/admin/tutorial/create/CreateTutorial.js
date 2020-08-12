import React from 'react';
import TextBox from "../../../form/TextBox";
import TextArea from "../../../form/TextArea";
import requester from "../../../../library/requester";
import Button from "../../../form/Button";
import formDataCollector from "../../../../library/formDataCollector";

class CreateTutorial extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            rootCategory: null,
        };
    }

    render() {
        console.log(this.state.rootCategory);

        const options = [];
        if (this.state.rootCategory != null) this.renderCategoryOptions(options, this.state.rootCategory.subcategories);
        const categoryCombobox = <select id="categoryID" className="form-control">{options}</select>;
        return (
            <div>
                <h1>Create Tutorial</h1>
                <div id="create-tutorial-form">
                    <TextBox id="name" label="Name"/>
                    <TextArea id="description" label="Description" />
                    {categoryCombobox}
                    <Button label="Create" onClick={(event) => this.createTutorial(event)}/>
                </div>
            </div>
        );
    }

    renderCategoryOptions(options, categories, indentation="") {
        for (let i = 0; i < categories.length; i++) {
            const option = (
                <option key={categories[i].id} value={categories[i].id}>{`${indentation}${categories[i].name}`}</option>
            )

            options.push(option);

            this.renderCategoryOptions(options, categories[i].subcategories, indentation + "---");
        }
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
        const data = formDataCollector.collect("create-tutorial-form");

        const path = `/tutorials`;
        requester.POST(path, data).then(
            (response) => {
                alert("Tutorial added with ID " + response.tutorialID);
            }
        )
    }
}

export default CreateTutorial;