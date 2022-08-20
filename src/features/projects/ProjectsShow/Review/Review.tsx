import React from "react";
import { Comment } from "../../../../interfaces";
import './Review.scss';
import { StyledRating } from "../../AddProjectReview";

const Review: React.FC<{review: Comment}> = ({review}) => {
    return (
        <div className="review">
            <div className="review__stars">
                <StyledRating name="read-only" value={review.stars} readOnly />
            </div>
            <p className="review__author">{review.author}</p>
            <p className="review__text">{review.text}</p>
            <p className="review__date">{new Date(review.written).toLocaleDateString()}</p>
            <hr />
        </div>
        

    )
}

export default Review;