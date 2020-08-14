import React from 'react';

import './style.css';
import requester from "../../../library/requester";

class Rater extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            hasRated: false,
            rating: null,
        };
    }

    render() {
        if (this.state.hasRated == null) return <div/>;

        const stars = this.renderStars(this.state.hasRated, this.state.rating);
        return (
            <div className="rater" onClick={event => this.rateTutorial(event)}>
                {stars}
            </div>
        );
    }

    renderStars(hasRated, rating) {
        const englishNumbers = ["one", "two", "three", "four", "five"];
        const stars = [];
        for (let i = englishNumbers.length - 1; i >= 0; i--) {
            let classes = "";
            if (hasRated) {
                if (englishNumbers[i] === rating) classes = "cur-rating";
            } else {
                classes = "star";
            }

            stars.push(<i key={i} data-value={englishNumbers[i]} className={`fa fa-star ${classes}`} aria-hidden="true"></i>);
        }
        return stars;
    }

    rateTutorial(event) {
        if (this.state.hasRated === null || this.state.hasRated) return;
        if (!event.target.classList.contains("star")) return;

        const rating = event.target.getAttribute("data-value");

        const path = `/evaluations/${this.props.tutorialID}`;
        const data = {
            evaluation: rating,
            itemType: "tutorial",
        }

        requester.POST(path, data).then(
            (response) => {
                alert("Rated successfully");
                this.setState({
                    hasRated: true,
                    rating: rating,
                })
            }
        )
    }

    componentDidMount() {
        this.fetchUserRating(this.props.tutorialID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tutorialID !== this.props.tutorialID) this.fetchUserRating(this.props.tutorialID);
    }

    fetchUserRating(tutorialID) {
        const path = `/evaluations/my`;
        const data = {
            itemIDs: [tutorialID]
        }

        requester.POST(path, data).then(
            (response) => {
                const evaluations = response.evaluations;

                const hasRated = evaluations[0] !== null;
                const rating = evaluations[0];

                this.setState({
                    hasRated: hasRated,
                    rating: rating,
                })
            }
        )
    }
}

export default Rater;