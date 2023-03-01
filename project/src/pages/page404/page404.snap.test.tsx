import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Page404 from './page404';
import HistoryRouter from '../../components/history-route/history-route'; // по какой то непонятной мне причине, jest вообще ничего знать не хочет об объекте истории браузера, но при этом отлично понимает роутинг

describe('testing Page404 render', () => {
  it('Should render correctly', () => {

    const history = createMemoryHistory();// создаем специальный объект истории в памяти.

    // делаем обертку в виде роутинга над нашим компонентом, чтобы в нем могли работать такие вещи, как Link
    const {container} = render(
      <HistoryRouter history={history}>
        <Page404 />
      </HistoryRouter>,
    );

    expect(container).toMatchSnapshot();

  });
});
