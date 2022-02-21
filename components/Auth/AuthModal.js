import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import SupaAuth from './supaauth'

export function AuthModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Modal isOpen={clicked} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{ (typeof window !== 'undefined') ? 
        localStorage.getItem('token') ? "Logout" : "Login" : ''
      }</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SupaAuth />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

