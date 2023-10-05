import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';

export interface ModalProps {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const Component = (props: ModalProps): JSX.Element => {
  const { children, title, ...rest } = props;

  return (
    <Modal {...rest} isCentered>
      <ModalOverlay />
      <ModalContent
        minW={{
          base: 'full',
          md: '70%',
          lg: '50%',
        }}
        h={{
          base: 'full',
          md: '70%',
        }}
      >
        <ModalHeader
          fontSize={{
            base: 20,
            lg: 30,
          }}
        >
          {title}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody overflow="scroll" py={5}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const areCompare = (prevProps: ModalProps, nextProps: ModalProps): boolean =>
  isEqual(prevProps.children, nextProps.children);

const ModalCustom = memo(Component, areCompare);

export default ModalCustom;
