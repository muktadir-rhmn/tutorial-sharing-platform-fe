import React from 'react';
import TextBox from "../../form/TextBox";
import TextArea from "../../form/TextArea";
import Button from "../../form/Button";
import requester from "../../../library/requester";
import formDataCollector from "../../../library/formDataCollector";

class AddUpdateLesson extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            lessonToUpdate: null,
        };
    }

    render() {
        const isUpdate = this.isUpdate();

        if (isUpdate && this.state.lessonToUpdate == null) return <div/>;

        const operationName = isUpdate ? "Update" : "Add";
        const name = isUpdate ? this.state.lessonToUpdate.name : "";
        const body = isUpdate ? this.state.lessonToUpdate.body: "";

        return (
            <div>
                <h1>{operationName} Lesson</h1>
                <div id="add-update-lesson-form">
                    <TextBox label="Name" id="name" value={name}/>
                    <TextArea label="Body" id="body" value={body}/>
                    <Button label={`${operationName}`} onClick={event => this.addUpdateLesson(event)}/>
                </div>
            </div>
        );
    }

    isUpdate() {
        return this.props.operation === "update";
    }

    componentDidMount() {
        if (this.props.operation === "update") {
            this.fetchLesson(this.props.lessonID);
        }
    }

    fetchLesson(lessonID) {
        const path = `/lessons/${lessonID}`;
        requester.GET(path).then(
            (lesson) => {
                this.setState({
                    lessonToUpdate: lesson,
                })
            }
        )
    }

    addUpdateLesson(event) {
        const data = formDataCollector.collect("add-update-lesson-form");
        let path;

        if (this.isUpdate()) {
            path = `/lessons/${this.props.lessonID}`;
            requester.POST(path, data).then(
                (response) => {
                    alert("Lesson updated successfully");
                }
            );
        } else {
            path = `/lessons`;
            data["tutorialID"] = this.props.tutorialID;
            data["chapterID"] = this.props.chapterID;
            requester.POST(path, data).then(
                (response) => {
                    alert("Lesson Added successfully");
                }
            )
        }
    }
}

export default AddUpdateLesson;