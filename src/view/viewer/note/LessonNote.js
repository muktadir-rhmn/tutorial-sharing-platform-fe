import React from 'react';
import formDataCollector from "../../../library/formDataCollector";
import requester from "../../../library/requester";
import userManager from "../../user/UserManager";

class LessonNote extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            note: ""
        };
    }

    render() {
        if (!userManager.isSignedIn()) return <div/>;
        if (this.props.lessonID == null) return <div/>;

        return (
            <div id="note-form" className="bg-light p-2 position-fixed" style={{minWidth: "300px"}}>
                <h3><i className="fa fa-sticky-note-o" aria-hidden="true"></i> Note</h3>
                <textarea id="note" className="form-control" rows="15" defaultValue={this.state.note} />
                <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-success" onClick={(event) => this.saveNote(event)}>
                        <i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
                </div>
            </div>
        );
    }

    saveNote(event) {
        if (this.props.lessonID == null) return;

        const data = formDataCollector.collect("note-form");
        const path = `/notes/${this.props.lessonID}`;
        requester.POST(path, data).then(
            (response) => {
                alert("Note saved successfully");
            }
        )
    }

    componentDidMount() {
        if (!userManager.isSignedIn()) return <div/>;
        this.fetchNote(this.props.lessonID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!userManager.isSignedIn()) return <div/>;
        if (this.props.lessonID !== prevProps.lessonID) this.fetchNote(this.props.lessonID);
    }

    fetchNote(lessonID) {
        if (lessonID == null) {
            this.setState({note: ""});
            return;
        }

        const path = `/notes/${lessonID}`;
        requester.GET(path).then(
            (response) => {
                this.setState({
                    note: response.note,
                })
            }
        )
    }
}

export default LessonNote;