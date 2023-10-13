import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spinner,
  Square,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { memo, useCallback, useState, MouseEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

// HOCs
import { withIsAuth } from '@/hocs';

// Hooks
import { usePagination, useProduct } from '@/hooks';

// Constants
import {
  ENDPOINT_SERVICES,
  LIMIT_QUANTITY,
  MESSAGES,
  TITLES,
  TIMES,
} from '@/constants';

// Components
import FormAdd, { IFormAddData } from './components/FormAdd';
import { IProductCard, Pagination, ProductCard } from '@/components';
import ModalCustom from '@/components/Modal';

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

  const toast = useToast({
    duration: TIMES.TOAST,
  });

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

      toast({
        title: TITLES.ADD,
        description: isSuccess
          ? MESSAGES.ADD_NEW_PRODUCT_SUCCESS
          : MESSAGES.ADD_NEW_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });

      if (isSuccess) return handleCloseModal();
    },
    [handleCloseModal, onAddProduct, toast],
  );

  const handleSubmitUpdate = useCallback(
    async (id: number, product: IFormAddData) => {
      const isSuccess = await onUpdateProduct(id, product);

      toast({
        title: TITLES.UPDATE,
        description: isSuccess
          ? MESSAGES.UPDATE_PRODUCT_SUCCESS
          : MESSAGES.UPDATE_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });

      if (isSuccess) return handleCloseModal();
    },
    [handleCloseModal, onUpdateProduct, toast],
  );

  const handleSubmitRemove = useCallback(
    async (id: number): Promise<void> => {
      const isSuccess: boolean = await onRemoveProduct(id);

      toast({
        title: TITLES.REMOVE,
        description: isSuccess
          ? MESSAGES.REMOVE_PRODUCT_SUCCESS
          : MESSAGES.REMOVE_PRODUCT_FAIL,
        status: isSuccess ? 'success' : 'error',
      });
    },
    [onRemoveProduct, toast],
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

      const info: IProductCard = {
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
                  color="black"
                  icon={<Trash fill="white" />}
                  bg="red.10"
                  variant="hoverShadow"
                  onClick={handleRemove}
                />

                <IconButton
                  aria-label="Button remove product"
                  color="black"
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

  if (isLoading)
    return (
      <Square size="full">
        <Spinner />
      </Square>
    );

  if (isError)
    return (
      <Square size="full">
        <Text>{MESSAGES.FAIL_TO_FETCH}</Text>
      </Square>
    );

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
            <Text fontSize={18} fontWeight="bold">
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
