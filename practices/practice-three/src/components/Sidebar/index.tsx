import { FC, ReactNode, Suspense, lazy, memo, useMemo } from 'react';
import {
  Button,
  Center,
  IconButton,
  Link,
  List,
  ListItem,
  Spinner,
  Square,
  Switch,
  SystemStyleObject,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

// Icons
import {
  ArrowLeft,
  ArrowRight,
  CartFill,
  HeartSideBarFill,
  LightMode,
  PersonCircle,
} from '@/assets/icons';

// Components
import Modal from '@/components/Modal';
const Cart = lazy(() => import('@/components/Cart'));
const Wishlist = lazy(() => import('@/components/Wishlist'));

export interface SideBarProps {
  isAuth?: boolean;
}

export interface ISideBarOption {
  icon: FC;
  title: string;
  isShowPseudo?: boolean;
  pseudoColor?: string;
  pseudoValue?: number | string;
  onClick?: () => void;
}

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
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpenWishlist, onToggle: onToggleWishlist } =
    useDisclosure();
  const { isOpen: isOpenCart, onToggle: onToggleCart } = useDisclosure();

  // Todo: Update when integrate BE
  const quantityCart = 8;
  const quantityFavorite = 9;

  const sidebarOptions: ISideBarOption[] = useMemo(
    (): ISideBarOption[] => [
      {
        icon: HeartSideBarFill,
        title: 'Wishlist',
        isShowPseudo: true,
        pseudoColor: 'red.20',
        pseudoValue: quantityCart,
        onClick: onToggleWishlist,
      },
      {
        icon: CartFill,
        title: 'Cart',
        isShowPseudo: true,
        pseudoColor: 'blue.alpha.10',
        pseudoValue: quantityFavorite,
        onClick: onToggleCart,
      },
      {
        icon: PersonCircle,
        title: 'Join',
      },
    ],
    [onToggleCart, onToggleWishlist],
  );

  const renderOptions: JSX.Element[] = useMemo(() => {
    return sidebarOptions.map((option): JSX.Element => {
      const {
        pseudoValue = 0,
        isShowPseudo,
        pseudoColor,
        icon,
        title,
        onClick,
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
            borderRadius: '100%',
            fontSize: '14px',
            fontWeight: 'regular',
            color: 'white',
          }
        : {};

      return (
        <ListItem position="relative" _after={pseudo} key={title} h={20}>
          <Square
            as={Button}
            gap={5}
            mt={22}
            p={0}
            color="black"
            fontWeight="regular"
            justifyContent={isOpen ? 'flex-start' : 'center'}
            fontSize={{
              '2xl': 26,
              xl: 18,
            }}
            onClick={onClick}
          >
            <Icon />

            {isOpen && title}
          </Square>
        </ListItem>
      );
    });
  }, [isOpen, sidebarOptions]);

  return (
    <>
      <VStack
        minW={104}
        borderRadius={30}
        px={5}
        py={7}
        w="fit-content"
        border="1px solid"
        borderColor="blackAlpha.300"
        boxShadow="base"
        justifyContent="space-between"
      >
        <List>
          {renderOptions}
          <ListItem position="relative" h={20}>
            <Square
              as={Link}
              justifyContent={isOpen ? 'flex-start' : 'center'}
              gap={5}
              mt={{
                xl: 38,
                '2xl': 22,
              }}
              fontSize={{
                '2xl': 24,
                xl: 16,
              }}
            >
              {/*
             Mode Icon

            // Todo: Update when apply change mode   
            */}
              <LightMode />
              {isOpen && (
                <>
                  Light
                  <Switch size="lg" />
                </>
              )}
            </Square>
          </ListItem>
        </List>
        <Square>
          <IconButton
            w={58}
            h={58}
            borderRadius="full"
            border="1px solid"
            borderColor="blackAlpha.300"
            boxShadow="base"
            aria-label="Search database"
            icon={isOpen ? <ArrowRight /> : <ArrowLeft />}
            onClick={onToggle}
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
