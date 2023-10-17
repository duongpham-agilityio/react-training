import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { memo, useCallback, useState, MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

// HOCs
import { withIsAuth } from '@/hocs';

// Hooks
import { usePagination, useProduct, useToast } from '@/hooks';

// Constants
import {
  ENDPOINT_SERVICES,
  LIMIT_QUANTITY,
  MESSAGES,
  TITLES,
} from '@/constants';

// Components
import FormAdd, { IFormAddData } from './components/FormAdd';
import { TProductCard, Pagination, ProductCard, Spinner } from '@/components';
import ModalCustom from '@/components/Modal';
import { FetchingMessage } from '@/components/common';

// Services
import { productAPI } from '@/services/apis';

// Types
import { IProduct } from '@/interface';

// Icons
import { Pencil, Trash } from '@/assets/icons';

const ProfileComponent = () => {
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: [ENDPOINT_SERVICES.PRODUCTS],
    queryFn: productAPI.getAll,
  });
  const {
    data: products,
    pagination,
    currentPage,
    isNextPage,
    isPrevPage,
    onChangePage,
  } = usePagination(data);
  const { isOpen: isOpenFormAdd, onToggle: onToggleForm } = useDisclosure();
  const [edit, setEdit] = useState<IFormAddData>();

  const { showToast } = useToast();

  const { onAddProduct, onUpdateProduct, onRemoveProduct } = useProduct();

  const handleOpenFormUpdate = useCallback(
    (product: IFormAddData) => {
      onToggleForm();
      setEdit(product);
    },
    [onToggleForm],
  );

  const handleCloseModal = useCallback(() => {
    onToggleForm();
    setEdit(undefined);
  }, [onToggleForm]);

  const handleSubmitAdd = useCallback(
    async (product: IFormAddData) => {
      const isSuccess: boolean = await onAddProduct(product);

      showToast({
        title: TITLES.ADD,
        description: isSuccess
          ? MESSAGES.ADD_NEW_PRODUCT_SUCCESS
          : MESSAGES.ADD_NEW_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });

      if (isSuccess) return handleCloseModal();
    },
    [handleCloseModal, onAddProduct, showToast],
  );

  const handleSubmitUpdate = useCallback(
    async (id: number, product: IFormAddData) => {
      const isSuccess = await onUpdateProduct(id, product);

      showToast({
        title: TITLES.UPDATE,
        description: isSuccess
          ? MESSAGES.UPDATE_PRODUCT_SUCCESS
          : MESSAGES.UPDATE_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });

      if (isSuccess) return handleCloseModal();
    },
    [handleCloseModal, onUpdateProduct, showToast],
  );

  const handleSubmitRemove = useCallback(
    async (id: number): Promise<void> => {
      const isSuccess: boolean = await onRemoveProduct(id);

      showToast({
        title: TITLES.REMOVE,
        description: isSuccess
          ? MESSAGES.REMOVE_PRODUCT_SUCCESS
          : MESSAGES.REMOVE_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });
    },
    [onRemoveProduct, showToast],
  );

  const handleSubmit = useCallback(
    async (product: IFormAddData, id?: number) => {
      if (!edit) return handleSubmitAdd(product);

      return handleSubmitUpdate(id || 0, product);
    },
    [edit, handleSubmitAdd, handleSubmitUpdate],
  );

  const handleRenderProduct = useCallback(
    (product: IProduct): JSX.Element => {
      const { id, imageURL, name, description, price, quantity, category } =
        product;

      const editData: IFormAddData = {
        id,
        imageURL,
        name,
        description,
        price,
        quantity,
        category,
      };

      const info: TProductCard = {
        id,
        imageURL,
        price,
        description,
        title: name,
        status: quantity <= LIMIT_QUANTITY,
        statusMessage: `Only ${quantity} left`,
      };

      const handleEdit = (e: MouseEvent): void => {
        e.preventDefault();

        handleOpenFormUpdate(editData);
      };

      const handleRemove = (e: MouseEvent): void => {
        e.preventDefault();

        handleSubmitRemove(id);
      };

      return (
        <GridItem key={id}>
          <ProductCard
            info={info}
            renderIcon={() => (
              <Flex gap={2}>
                <IconButton
                  aria-label="Button remove product"
                  color="primary"
                  icon={<Trash fill="white" />}
                  bg="error"
                  variant="hoverShadow"
                  onClick={handleRemove}
                />

                <IconButton
                  aria-label="Button remove product"
                  color="primary"
                  icon={<Pencil />}
                  bg="gray.700"
                  variant="hoverShadow"
                  onClick={handleEdit}
                />
              </Flex>
            )}
          />
        </GridItem>
      );
    },
    [handleOpenFormUpdate, handleSubmitRemove],
  );

  if (isLoading) return <Spinner />;

  if (isError) return <FetchingMessage message={MESSAGES.FAIL_TO_FETCH} />;

  return (
    <VStack>
      <Flex w="full" justifyContent="flex-end">
        <Button
          size="lg"
          bgColor="gray.100"
          variant="hoverShadow"
          onClick={onToggleForm}
        >
          Create
        </Button>
      </Flex>
      <Grid
        templateColumns={{
          base: '1fr',
          xl: '1fr 1fr',
        }}
        gap={6}
        py={5}
      >
        {products.length ? (
          products.map(handleRenderProduct)
        ) : (
          <Center>
            <Text fontSize="lg" fontWeight="bold">
              {MESSAGES.EMPTY}
            </Text>
          </Center>
        )}
      </Grid>

      {/* Pagination */}
      <Pagination
        data={pagination}
        currentPage={currentPage}
        isNextPage={isNextPage}
        isPrevPage={isPrevPage}
        onChangePage={onChangePage}
        onNextPage={onChangePage}
        onPreviousPage={onChangePage}
      />

      {isOpenFormAdd && (
        <ModalCustom
          title={edit ? TITLES.UPDATE_PRODUCT : TITLES.CREATE_PRODUCT}
          isOpen
          onClose={handleCloseModal}
        >
          <FormAdd onSubmit={handleSubmit} data={edit} />
        </ModalCustom>
      )}
    </VStack>
  );
};

const Profile = memo(withIsAuth(ProfileComponent));
export default Profile;
