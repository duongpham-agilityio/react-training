interface ITitles {
  ADD: string;
  REMOVE: string;
  UPDATE: string;
  ERROR: string;
  SUCCESS: string;
  CREATE_PRODUCT: string;
  UPDATE_PRODUCT: string;
}

export const TITLES: Readonly<ITitles> = {
  ADD: 'Add',
  UPDATE: 'Update',
  REMOVE: 'Remove',
  ERROR: 'Error',
  SUCCESS: 'Success',
  CREATE_PRODUCT: 'Create product',
  UPDATE_PRODUCT: 'Update product',
};
