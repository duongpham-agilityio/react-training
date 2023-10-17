import { Button, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, memo, useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// HOCs
import { withIsAuth } from '@/hocs';

// Hooks
import { usePagination, useProduct, useToast } from '@/hooks';

// Constants
import { ENDPOINT_SERVICES, MESSAGES, TITLES } from '@/constants';

// Components
import { IFormAddData } from './components/FormAdd';
import { Pagination, Spinner } from '@/components';
import ModalCustom from '@/components/Modal';
import { FetchingMessage } from '@/components/common';
import { ShowProducts } from './components/Products';

// Services
import { productAPI } from '@/services/apis';

// Lazy com
const Dialog = lazy(() => import('@/components/Dialog'));
const FormAdd = lazy(() => import('./components/FormAdd'));

//Types
import { IProduct } from '@/interface';

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
  const { isOpen: isOpenRemove, onToggle: onToggleRemoveDialog } =
    useDisclosure();
  const [productId, setProductId] = useState<number>();

  const { showToast } = useToast();

  const { onAddProduct, onUpdateProduct, onRemoveProduct } = useProduct();

  // Handle open form
  const handleOpenFormUpdate = useCallback(
    (productId: number) => {
      onToggleForm();
      setProductId(productId);
    },
    [onToggleForm],
  );

  // Handle close form
  const handleCloseModal = useCallback(() => {
    onToggleForm();
    setProductId(undefined);
  }, [onToggleForm]);

  // Handle open Dialog
  const handleOpenDialog = useCallback(
    (productId: number) => {
      onToggleRemoveDialog();
      setProductId(productId);
    },
    [onToggleRemoveDialog],
  );

  // Handle close Dialog
  const handleCloseDialog = useCallback(() => {
    onToggleRemoveDialog();
    setProductId(undefined);
  }, [onToggleRemoveDialog]);

  // Handle create new product
  const handleCreateProduct = useCallback(
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

  // Handle submit update product
  const handleUpdateProduct = useCallback(
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

  // Handle submit remove product
  const handleSubmitRemove = useCallback(async (): Promise<void> => {
    if (!productId) return;

    const isSuccess: boolean = await onRemoveProduct(productId);

    onToggleRemoveDialog();
    showToast({
      title: TITLES.REMOVE,
      description: isSuccess
        ? MESSAGES.REMOVE_PRODUCT_SUCCESS
        : MESSAGES.REMOVE_PRODUCT_FAIL,
      status: isSuccess ? 'success' : 'error',
    });
  }, [onRemoveProduct, onToggleRemoveDialog, productId, showToast]);

  // Handle submit form
  const handleSubmit = useCallback(
    async (product: IFormAddData, id?: number) => {
      if (!productId) return handleCreateProduct(product);

      return handleUpdateProduct(id || 0, product);
    },
    [handleCreateProduct, handleUpdateProduct, productId],
  );

  // Get the information that needs to be updated by productID
  const infoProductWhenUpdate: IFormAddData | undefined = useMemo(() => {
    const product: IProduct | undefined = products.find(
      (product) => product.id === productId,
    );

    if (!product) return;

    const { id, name, description, category, imageURL, price, quantity } =
      product;
    const infoUpdate: IFormAddData = {
      id,
      name,
      description,
      category,
      imageURL,
      price,
      quantity,
    };

    return infoUpdate;
  }, [productId, products]);

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

      <ShowProducts
        data={products}
        onEdit={handleOpenFormUpdate}
        onRemove={handleOpenDialog}
      />

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

      <Suspense fallback={<Spinner />}>
        {isOpenFormAdd && (
          <ModalCustom
            title={productId ? TITLES.UPDATE_PRODUCT : TITLES.CREATE_PRODUCT}
            isOpen
            onClose={handleCloseModal}
          >
            <FormAdd onSubmit={handleSubmit} data={infoProductWhenUpdate} />
          </ModalCustom>
        )}

        {isOpenRemove && (
          <Dialog
            title="Delete product"
            description="Are you sure?"
            isOpen={isOpenRemove}
            onClose={handleCloseDialog}
            onAccept={handleSubmitRemove}
          />
        )}
      </Suspense>
    </VStack>
  );
};

const Profile = memo(withIsAuth(ProfileComponent));
export default Profile;
