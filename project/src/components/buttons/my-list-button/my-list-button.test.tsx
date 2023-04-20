import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import {Routes, Route} from 'react-router-dom';

import MyListButton from './my-list-button';
import HistoryRouter from '../../../components/history-route/history-route';
import { AppRoute } from '../../../const/const';

const history = createMemoryHistory();

describe('MyListButton Component tests', () => {

  it(('should render correctly'), () => {

    render(
      <HistoryRouter history={history}>
        <MyListButton status='add'/>
      </HistoryRouter>
    );

    expect(screen.getByRole('button')).toHaveTextContent('My list');

  });

  it('should redirect correctly', async () => {
    history.push('/this');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/this'
            element= {<MyListButton status='add'/>}
          />
          <Route
            path={AppRoute.MyList}
            element= {<h1>another page</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByRole('button')).toHaveTextContent('My list');

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('another page')).toBeInTheDocument();

  });
});

