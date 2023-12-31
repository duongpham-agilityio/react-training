import { FC, ReactNode, Suspense, lazy, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Center,
  IconButton,
  List,
  ListItem,
  Spinner,
  Square,
  SystemStyleObject,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

// Stores
import {
  TCartStore,
  TFavoriteStore,
  useCartStore,
  useFavoriteStore,
} from '@/stores';

// Components
import Modal from '@/components/Modal';

// Icons
import {
  ArrowLeft,
  ArrowRight,
  CartFill,
  HeartSideBarFill,
  PersonCircle,
} from '@/assets/icons';
import { ROUTES } from '@/constants';

// Lazy components
const Cart = lazy(() => import('@/components/Cart'));
const Wishlist = lazy(() => import('@/components/Wishlist'));

export type TSideBarProps = {
  isAuth?: boolean;
};

export type TSideBarOption = {
  icon: FC;
  title: string;
  to?: string;
  isShowPseudo?: boolean;
  pseudoColor?: string;
  pseudoValue?: number | string;
  onClick?: () => void;
};

const Lazy = ({ children }: { children: ReactNode }): JSX.Element => (
  <Suspense
    fallback={
      <Center>
        <Spinner />
      </Center>
    }
  >
    {children}
  </Suspense>
);

export const SideBar = memo((): JSX.Element => {
  const { isOpen: isShowFullSidebar, onToggle: onShowFullSideBar } =
    useDisclosure();
  const { isOpen: isOpenWishlist, onToggle: onToggleWishlist } =
    useDisclosure();
  const { isOpen: isOpenCart, onToggle: onToggleCart } = useDisclosure();

  // Quantity product in cart
  const quantityCart = useCartStore((state: TCartStore) => state.data.length);

  // Quantity favorite product
  const favoriteSize = useFavoriteStore(
    (state: TFavoriteStore) => state.data.length,
  );

  const sidebarOptions: TSideBarOption[] = useMemo(
    (): TSideBarOption[] => [
      {
        icon: HeartSideBarFill,
        title: 'Wishlist',
        isShowPseudo: true,
        pseudoColor: 'errorToLight',
        pseudoValue: favoriteSize,
        onClick: onToggleWishlist,
      },
      {
        icon: CartFill,
        title: 'Cart',
        isShowPseudo: true,
        pseudoColor: 'infoRGB',
        pseudoValue: quantityCart,
        onClick: onToggleCart,
      },
      {
        icon: PersonCircle,
        title: 'Join',
        to: `/${ROUTES.PROFILE}`,
      },
    ],
    [favoriteSize, onToggleWishlist, quantityCart, onToggleCart],
  );

  const renderOptions: JSX.Element[] = useMemo(() => {
    return sidebarOptions.map((option): JSX.Element => {
      const {
        pseudoValue = 0,
        icon,
        title,
        pseudoColor,
        isShowPseudo,
        onClick,
        ...rest
      } = option;
      const Icon = icon;
      const pseudo: SystemStyleObject = isShowPseudo
        ? {
            width: '24px',
            height: '24px',
            content: `'${pseudoValue}'`,
            position: 'absolute',
            top: '-25px',
            left: '45px',
            bg: pseudoColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'full',
            fontSize: 'md',
            fontWeight: 'regular',
            color: 'white',
          }
        : {};

      return (
        <ListItem position="relative" _after={pseudo} key={title} h={20}>
          <Square
            as={rest.to ? Link : Button}
            {...rest}
            aria-label={`Button navigate to the ${title}`}
            gap={5}
            mt={22}
            p={0}
            color="primary"
            fontWeight="regular"
            justifyContent={isShowFullSidebar ? 'flex-start' : 'center'}
            fontSize={{
              '2xl': '4xl',
              xl: 'lg',
            }}
            onClick={onClick}
          >
            <Icon />

            {isShowFullSidebar && title}
          </Square>
        </ListItem>
      );
    });
  }, [isShowFullSidebar, sidebarOptions]);

  return (
    <>
      <VStack
        minW={104}
        borderRadius="2xl"
        px={5}
        py={7}
        w="fit-content"
        border="1px"
        borderColor="darkRGB"
        boxShadow="base"
        justifyContent="space-between"
      >
        <List>{renderOptions}</List>
        <Square>
          <IconButton
            w={58}
            h={58}
            borderRadius="full"
            border="1px"
            boxShadow="base"
            aria-label="Search database"
            icon={isShowFullSidebar ? <ArrowRight /> : <ArrowLeft />}
            onClick={onShowFullSideBar}
          />
        </Square>
      </VStack>

      {
        // Wishlist
        isOpenWishlist && (
          <Modal
            title="Wishlist"
            isOpen={isOpenWishlist}
            onClose={onToggleWishlist}
          >
            <Lazy>
              <Wishlist />
            </Lazy>
          </Modal>
        )
      }

      {
        // Cart
        isOpenCart && (
          <Modal title="Cart" isOpen={isOpenCart} onClose={onToggleCart}>
            <Lazy>
              <Cart />
            </Lazy>
          </Modal>
        )
      }
    </>
  );
});
