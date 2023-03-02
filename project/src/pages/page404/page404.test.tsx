import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Page404 from './page404';
import HistoryRouter from '../../components/history-route/history-route'; // по какой то непонятной мне причине, jest вообще ничего знать не хочет об объекте истории браузера, но при этом отлично понимает роутинг

describe('testing Page404 render', () => {
  it('Should show text correctly', () => {

    const history = createMemoryHistory();// создаем специальный объект истории в памяти.

    // делаем обертку в виде роутинга над нашим компонентом, чтобы в нем могли работать такие вещи, как Link
    render( // рендерим, но в отличии от снапшота, нет смысла момещать результат в отдельный контейнер
      <HistoryRouter history={history}>
        <Page404 />
      </HistoryRouter>,
    );

    const innerText = screen.getByText(/Maybe this page moved?/i); // если ищем точное совпедение, то обычную строку в параметрами, если же интересует вхождение, то используем регулярное выражение
    const linkText = screen.getByText(/home/i);
    const wrongText = screen.queryByText(/Такого текста точно нет/); // тут обязательно используем queryByText вместо getByText , так как мы будем искать негативный вариант, и getByText сразу будет выкидывать ошибку поиска, в то время как queryByText просто вернет значение null
    const linkTag = screen.getByRole('link'); // поиск тега, отвечающего за линк
    const linkArray = screen.getAllByRole('link'); // поиск всех ссылок на странице

    expect(innerText).toBeInTheDocument();
    expect(linkText).toBeInTheDocument();
    expect(wrongText).not.toBeInTheDocument(); // негативный поиск
    expect(linkTag).toBeInTheDocument(); // поиск по тегу
    expect(linkArray.length).toBe(1); // должна быть только одна ссылка

  });
});
