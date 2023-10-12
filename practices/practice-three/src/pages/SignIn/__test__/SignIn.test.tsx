import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Pages
import SignIn from '..';

// Constant
import { MESSAGES } from '@/constants';

const setup = () =>
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>,
  );

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

  it('Submit', () => {
    const { getByText, getByRole } = setup();
    const button = getByRole('button');

    fireEvent.click(button);

    expect(getByText(MESSAGES.EMPTY_FILED)).toBeDefined();
  });
});
