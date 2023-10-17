import { cartItemProps } from '@/mocks';
import { TCartStore, useCartStore } from '..';
import { act, fireEvent, render } from '@testing-library/react';

const Component = () => {
  const addNew = useCartStore((state: TCartStore) => state.addNewProduct);
  const update = useCartStore((state: TCartStore) => state.updateCart);

  const handleAddNew = () => addNew(cartItemProps);
  const handleUpdate = () => update([]);

  return (
    <>
      <button onClick={handleAddNew}>Add new</button>
      <button onClick={handleUpdate}>Update</button>
    </>
  );
};

const setup = () => render(<Component />);

describe('Cart store', () => {
  it('Add', async () => {
    const { getAllByRole } = setup();

    await act(() => {
      fireEvent.click(getAllByRole('button')[0]);
    });

    expect(useCartStore.getState().data.length).toBe(1);
  });

  it('Update', async () => {
    const { getAllByRole } = setup();
    const buttons = getAllByRole('button');

    await act(() => {
      fireEvent.click(buttons[0]);
    });

    expect(useCartStore.getState().data.length).toBe(2);

    await act(() => {
      fireEvent.click(buttons[1]);
    });

    expect(useCartStore.getState().data.length).toBe(0);
  });
});
