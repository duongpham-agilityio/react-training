import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { memo, useRef } from 'react';

export type TDialogProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel?: () => void;
};

const DialogComponent = (props: TDialogProps) => {
  const { title, description, isOpen, onClose, onAccept, onCancel } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isCentered
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />

        {description && <AlertDialogBody>{description}</AlertDialogBody>}

        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={onCancel ?? onClose}
            color="darkGray30"
            bg="darkToLight"
          >
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={onAccept}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(DialogComponent);
