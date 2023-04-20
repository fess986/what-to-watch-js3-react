import React from 'react';
import { useAppDispatch } from '../../../hooks';
import { addToFavoriteAction, removeFromFavoriteAction } from '../../../store/api-actions';

type statusProps = {
  status : 'add'|'added',
  id?: number,
}

const MyListButton = ({status, id = 1} : statusProps) : JSX.Element => {
  const dispatch = useAppDispatch();

  const onButtonClick = () => {
    (status === 'add')
      ?
      dispatch(addToFavoriteAction(id))
      :
      dispatch(removeFromFavoriteAction(id));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          (status === 'add')
            ?
            <use xlinkHref="#add"></use>
            :
            <use xlinkHref="#in-list"></use>
        }

      </svg>
      <span>My list</span>
    </button>
  );
};

export default MyListButton;
