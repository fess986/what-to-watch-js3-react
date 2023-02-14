import { createBrowserHistory } from 'history';
import type {BrowserHistory} from 'history';
// import { BrowserHistory } from 'history'; // type - не обязательно указывать для импорта типов. Более того лучше это вообще не делать, так как могут возникнуть неожиданные ошибки в работе с такими типами

const browserHistory : BrowserHistory = createBrowserHistory();

export default browserHistory;
