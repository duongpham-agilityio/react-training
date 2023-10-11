import { fireEvent, render } from '@testing-library/react';

// Pages
import SignIn from '..';

const setup = () => render(<SignIn />);

describe('SignIn', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Change input value', () => {
    const { getByPlaceholderText } = setup();
    const inputEmail: HTMLInputElement = getByPlaceholderText(
      'Please enter your email',
    ) as HTMLInputElement;
    const mockValue = 'duong.pham@gmail.com';

    fireEvent.change(inputEmail, {
      target: {
        value: mockValue,
      },
    });

    expect(inputEmail.value).toBe(mockValue);
  });
});
