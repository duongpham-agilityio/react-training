import { render } from '@testing-library/react';

// Components
import { RenderPage } from '../RenderPage';

describe('RenderPage', () => {
  it('Match to snapshot', () => {
    const { container } = render(<RenderPage />);

    expect(container).toMatchSnapshot();
  });
});
