import React from 'react';
import requester from "../../../../library/requester";
import {Link} from "react-router-dom";
import adminPaths from "../../AdminPaths";

class TutorialList extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            tutorials: [],
        };
    }

    render() {
        const tutorialRows = this.renderTutorialRows(this.state.tutorials);
        return (
            <div>
                <h1>My Tutorial List</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tutorialRows}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTutorialRows(tutorials) {
        const tutorialRows = [];
        for (let i = 0; i < tutorials.length; i++) {
            const tutorialRow = this.renderTutorialRow(tutorials[i]);

            tutorialRows.push(tutorialRow);
        }

        return tutorialRows;
    }

    renderTutorialRow(tutorial) {
        return (
            <tr key={tutorial.id}>
                <td>
                    <Link to={adminPaths.myTutorialListPath(tutorial.id)}>{tutorial.name}</Link>
                </td>
                <td>{tutorial.description}</td>
                <td>
                    <Link className="btn btn-outline-success" to={adminPaths.updateTutorialPath(tutorial.id)}>Edit</Link>
                </td>
            </tr>
        )
    }

    componentDidMount() {
        const path = `/tutorials/my`;
        requester.GET(path).then(
            (response) =>{
                this.setState({
                    tutorials: response.tutorials
                })
            }
        )
    }
}

export default TutorialList;