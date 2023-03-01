import {render} from '@testing-library/react';
import Loading from './loading';

describe('testing Loading screen render', () => {
  it('Should render correctly', () => {

    const {container} = render(<Loading />); // рендерим компонент и помещаем в контейнер при помощи render от @testing-library/react.
    // <Loading count={count}/> - так же сюда можно какие-либо пропсы передавать, если того требует компонент

    expect(container).toMatchSnapshot();
  });
});
