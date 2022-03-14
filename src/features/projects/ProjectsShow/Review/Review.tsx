import React from "react";
import { Comment } from "../../../../interfaces";
import './Review.scss';

const Review: React.FC<{review: Comment}> = ({review}) => {
    return (
        <div className="review">
            <p className="review__author">{review.author}</p>
            <p className="review__text">{review.text}</p>
            <p className="review__date">{new Date(review.written).toLocaleDateString()}</p>
            <hr />
        </div>
        

    )
}

export default Review;