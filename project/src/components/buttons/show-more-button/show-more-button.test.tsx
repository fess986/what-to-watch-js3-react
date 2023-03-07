import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ShowMoreButton from './show-more-button';

describe('MyListBuShowMoreButtontton Component tests', () => {
  const showMoreButtonHandler = jest.fn();

  it(('should render correctly'), () => {

    render(
      <ShowMoreButton showMoreButtonHandler={showMoreButtonHandler}/>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Show more');

  });

  it(('should call handler when press button'), async () => {

    render(
      <ShowMoreButton showMoreButtonHandler={showMoreButtonHandler}/>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Show more');

    expect(showMoreButtonHandler).not.toBeCalled();

    await userEvent.click(screen.getByRole('button'));

    expect(showMoreButtonHandler).toBeCalled();

  });


});

export {};

