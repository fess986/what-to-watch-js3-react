import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { appRouteWithId } from '../../../const/const';

function AddReviewButton() : JSX.Element {
  const params = useParams();

  return (
    <Link to={appRouteWithId('AddReview', params.id)} className="btn film-card__button">Add review</Link>
  );

}

export default AddReviewButton;
