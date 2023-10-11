import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import { Products } from '@/pages/Home/components';

// Mocks
import { products } from '@/mocks';

const setup = () =>
  render(
    <BrowserRouter>
      <Products data={products} onLike={jest.fn()} onAddToCart={jest.fn()} />
    </BrowserRouter>,
  );

describe('Products', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
