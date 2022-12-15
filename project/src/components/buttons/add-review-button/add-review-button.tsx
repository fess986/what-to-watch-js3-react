import React from 'react';
import { Link, useParams } from 'react-router-dom';

function AddReviewButton() : JSX.Element {
  const params = useParams();

  return (
    <Link to={`/films/${params.id}/review`} className="btn film-card__button">Add review</Link>
  );

}

export default AddReviewButton;
