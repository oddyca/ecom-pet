'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from '@nextui-org/react';

export default function OrderModal({ items }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>

      <Button
        type="button"
        onPress={onOpen}
        className="w-full py-2 rounded-lg bg-black text-white flex flex-col items-center hover:bg-[#555555]"
      >
        CHECKOUT
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Checkout</ModalHeader>
              <ModalBody>
                <h3>Adress Information</h3>
                <Input
                  autoFocus
                  label="City"
                  placeholder="Enter your city name"
                  variant="bordered"
                />
                <Input
                  label="Adress"
                  placeholder="Enter your house/apt adress"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-end">
                  <Link
                    className="text-link-blue"
                    href="/info"
                    size="sm"
                  >
                    Delivery information
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                >
                  Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
