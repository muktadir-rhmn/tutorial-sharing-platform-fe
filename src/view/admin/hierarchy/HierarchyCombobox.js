import React from 'react';
import requester from "../../../library/requester";

class HierarchyCombobox extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            rootCategory: null,
        };
    }

    render() {
        const rootCategory = this.state.rootCategory;
        const options = [];
        if (rootCategory != null) {
            let categories = this.props.includeRoot ? [rootCategory] : rootCategory.subcategories
            this.renderCategoryOptions(options, categories, rootCategory.id);
        }

        return (
            <div>
                <label form={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} className="form-control">{options}</select>
            </div>
        );
    }

    renderCategoryOptions(options, categories, path, indentation="") {
        for (let i = 0; i < categories.length; i++) {
            const option = (
                <option key={categories[i].id} value={`${path}:${categories[i].id}`}>{`${indentation}${categories[i].name}`}</option>
            )

            options.push(option);

            const newPath = path + categories[i].id;
            this.renderCategoryOptions(options, categories[i].subcategories, newPath, indentation + "---");
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
}

export default HierarchyCombobox;