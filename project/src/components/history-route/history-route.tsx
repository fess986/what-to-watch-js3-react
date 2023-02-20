// тут мы создаем обертку над Router, где опишем необходимые параметры для него через объект истории, созданный из библиотеки 'history'.

import React, {useState, useLayoutEffect} from 'react';
import { Router } from 'react-router-dom';
import type {BrowserHistory} from 'history';

export interface HistoryRouterProps {
  history: BrowserHistory // объект истории из пакета 'history'
  basename?: string
  children?: React.ReactNode
}

function HistoryRouter({ // тут мы деструктурируем сразу объект props на его свойства, такие как props.history
  basename,
  children,
  history,
}: HistoryRouterProps) : JSX.Element {

  const [state, setState] = useState({ // параметры для обновления истории
    action: history.action,
    location: history.location,
  });

  // работает как и обычный useEffect, но асинхронно, после того как страница уже отрисуется. Редко применяется, когда это оправданно - тут не понятно, оправдано ли это
  useLayoutEffect(() => history.listen(setState), [history]); // при смене history, меняем параметры истории

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
