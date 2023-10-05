import { FC, memo, useMemo } from 'react';
import {
  IconButton,
  Link,
  List,
  ListItem,
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

export interface SideBarProps {
  isAuth?: boolean;
}

export interface ISideBarOption {
  icon: FC;
  title: string;
  isShowPseudo?: boolean;
  pseudoColor?: string;
  pseudoValue?: number | string;
}

export const SideBar = memo(() => {
  const { isOpen, onToggle } = useDisclosure();

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
      },
      {
        icon: CartFill,
        title: 'Cart',
        isShowPseudo: true,
        pseudoColor: 'blue.alpha.10',
        pseudoValue: quantityFavorite,
      },
      {
        icon: PersonCircle,
        title: 'Join',
      },
    ],
    [],
  );

  const renderOptions = useMemo(() => {
    return sidebarOptions.map((option) => {
      const {
        isShowPseudo,
        pseudoColor,
        pseudoValue = 0,
        icon,
        title,
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
            as={Link}
            justifyContent={isOpen ? 'flex-start' : 'center'}
            gap={5}
            mt={88}
            fontSize={{
              '2xl': 30,
              xl: 18,
            }}
          >
            <Icon />

            {isOpen && title}
          </Square>
        </ListItem>
      );
    });
  }, [isOpen, sidebarOptions]);

  return (
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
              '2xl': 88,
              xl: 38,
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
  );
});
