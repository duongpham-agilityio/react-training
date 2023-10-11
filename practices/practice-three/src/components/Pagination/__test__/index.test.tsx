import { fireEvent, render } from '@testing-library/react';

// Components
import { Pagination } from '..';

// Mocks
import { defaultPropsPagination } from '@/mocks';

const setup = (props = defaultPropsPagination) =>
  render(<Pagination {...props} />);

describe('Pagination', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Re-render', () => {
    const { rerender } = setup();

    rerender(<Pagination {...defaultPropsPagination} data={[1, 2, 3]} />);
  });

  it('Render with empty data', () => {
    const { container } = setup({ ...defaultPropsPagination, data: [] });
    const button = container.querySelector('button');

    expect(button).toBeFalsy();
  });

  it('onClick next button', () => {
    const onNextPage = jest.fn();
    const { getByText } = setup({ ...defaultPropsPagination, onNextPage });

    fireEvent.click(getByText('Next'));

    expect(onNextPage).toBeCalled();
  });

  it('onClick prev button', () => {
    const onPreviousPage = jest.fn();
    const { getByText } = setup({
      ...defaultPropsPagination,
      currentPage: 2,
      isPrevPage: true,
      onPreviousPage,
    });

    fireEvent.click(getByText('Prev'));

    expect(onPreviousPage).toBeCalled();
  });

  it('onClick next button', () => {
    const onChangePage = jest.fn();
    const { getByText } = setup({ ...defaultPropsPagination, onChangePage });

    fireEvent.click(getByText('1'));

    expect(onChangePage).toBeCalled();
  });
});
