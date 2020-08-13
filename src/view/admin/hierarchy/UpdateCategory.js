import React from 'react';
import HierarchyCombobox from "./HierarchyCombobox";
import CreateUpdateCategory from "./CreateUpdateCategory";

class UpdateCategory extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            selectedCategory: null,
        };
    }

    render() {
        let updater = "";
        if (this.state.selectedCategory != null) updater = (<CreateUpdateCategory isUpdate={true}
                                                                                  categoryIDPath={this.state.selectedCategory.idPath}
                                                                                  name={this.state.selectedCategory.name} />);
        return (
            <div>
                <HierarchyCombobox label="Select Category" onChange={(categoryName, categoryIDPath) => this.handleCategoryChange(categoryName, categoryIDPath)}/>
                {updater}
            </div>
        );
    }

    handleCategoryChange(categoryName, categoryIDPath) {
        console.log("category changed");
        console.log(categoryIDPath)
        console.log(categoryName);

        this.setState({
            selectedCategory: {
                name: categoryName,
                idPath: categoryIDPath,
            }
        })
    }
}

export default UpdateCategory;