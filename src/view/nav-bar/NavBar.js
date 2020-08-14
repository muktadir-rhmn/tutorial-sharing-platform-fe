import React from 'react';

import './style.css';
import {Link} from "react-router-dom";
import navigatorPaths from "../navigator/NavigatorPaths";
import requester from "../../library/requester";
import UserBar from "./UserBar";

class NavBar extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            rootCategory: null,
        };
    }

    render() {
        if (this.state.rootCategory === null) return <div/>;

        const categoryHierarchy = this.renderCategoryHierarchy(this.state.rootCategory.subcategories);
        return (
            <div className="nav-area position-fixed vw-100">
                <UserBar/>
                {categoryHierarchy}
            </div>
        );
    }

    renderCategoryHierarchy(categories, level=0) {
        if (categories.length === 0) return "";

        const categoriesOfCurLevel = [];
        for (let i = 0; i < categories.length; i++) {
            const directionIcon = categories[i].subcategories.length === 0 ? "" : (level === 0 ? <i className="fa fa-angle-down" aria-hidden="true"></i>: <i className="fa fa-angle-right" aria-hidden="true"></i>);
            const subcategoryHierarchy = this.renderCategoryHierarchy(categories[i].subcategories, level + 1);

            const curCategory = (
                <li key={categories[i].id}>
                    <Link to={navigatorPaths.tutorialsByCategoryPath(categories[i].id)}>{categories[i].name} {directionIcon}</Link>
                    {subcategoryHierarchy}
                </li>
            )

            categoriesOfCurLevel.push(curCategory);
        }

        return <ul>{categoriesOfCurLevel}</ul>;
    }

    componentDidMount() {
        this.fetchCategoryHierarchy();
    }

    fetchCategoryHierarchy() {
        const path = `/hierarchy`;

        requester.GET(path).then(
            (rootCategory) => {
                this.setState({
                    rootCategory: rootCategory,
                })
            }
        );
    }
}

export default NavBar;