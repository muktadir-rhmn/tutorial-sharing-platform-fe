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
            if (this.props.includeRoot) options.push( <option key={rootCategory.id} value={rootCategory.id} >{rootCategory.name}</option>);
            this.renderCategoryOptions(options, rootCategory.subcategories, this.props.value, rootCategory.id);
        }

        return (
            <div>
                <label form={this.props.id}>{this.props.label}</label>
                <select defaultValue={this.props.value}
                        id={this.props.id}
                        onChange={(event => this.handleComboboxItemChange(event))}
                        className="form-control">{options}</select>
            </div>
        );
    }

    renderCategoryOptions(options, categories, selectedValue, path, indentation="") {
        for (let i = 0; i < categories.length; i++) {
            const option = (
                <option key={categories[i].id} value={`${path}:${categories[i].id}`} selected={selectedValue === categories[i].id}>{`${indentation}${categories[i].name}`}</option>
            )

            options.push(option);

            this.renderCategoryOptions(options, categories[i].subcategories, selectedValue, path + ":" + categories[i].id, indentation + "---");
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
                });
            }
        )
    }

    handleComboboxItemChange(event) {
        if (!this.props.onChange) return;

        const combobox = event.target;

        const curCategoryIDPath = combobox.value;
        const curCategoryName = combobox.options[combobox.selectedIndex].text.replace(new RegExp("-*"), "");

        this.props.onChange(curCategoryName, curCategoryIDPath);
    }
}

export default HierarchyCombobox;