import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import {Routes, Route} from 'react-router-dom';

import AddReviewButton from './add-review-button';
import HistoryRouter from '../../../components/history-route/history-route';

const history = createMemoryHistory();

describe('MyListButton Component tests', () => {

  it(('should render correctly'), () => {

    render(
      <HistoryRouter history={history}>
        <AddReviewButton />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Add review');

  });

  it('should redirect correctly', async () => {
    history.push('/this');

    // если в компоненте используется хук useParams, путь нужно указывать по тем же правилам как и при работе самого компонента path={'/films/:id/review'}
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/this'
            element= {<AddReviewButton />}
          />
          <Route
            path={'/films/:id/review'}
            element= {<h1>another page</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Add review');

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('another page')).toBeInTheDocument();

  });
});
