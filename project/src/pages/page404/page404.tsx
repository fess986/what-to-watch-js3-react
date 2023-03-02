// шаблон для реакт-страниц
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

function Page404(): JSX.Element {
  return (
    <div className='wrapper404'>
      <div className="mainbox">
        <div className="err404">4</div>
        <div className="err404-2">0</div>
        <div className="err404-3">4</div>
        <div className="msg404">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? Maybe..
          <p>
            Let{'\''}s go
            <Link className='link404' to={AppRoute.Main}>home</Link>
            and try from there.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page404;
