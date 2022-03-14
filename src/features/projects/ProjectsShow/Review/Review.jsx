import React from "react";
import './Review.scss';

const Review = (props) => {
    return (
        <div className="review">
            <p className="review__author">{props.author}</p>
            <p className="review__text">{props.text}</p>
            <p className="review__date">{new Date(props.date).toLocaleDateString()}</p>
            <hr />
        </div>
        

    )
}

export default Review;