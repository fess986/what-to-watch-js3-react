// шаблон для реакт-страниц
import React from 'react';

function Page404(): JSX.Element {
  return (
    <div className='wrapper404'>
      <div className="mainbox">
        <div className="err404">4</div>
        <div className="err404-2">0</div>
        <div className="err404-3">4</div>
        <div className="msg404">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let{'\''}s go <a className='link404' href="/">home</a> and try from there.</p></div>
      </div>
    </div>
  );
}

export default Page404;
