'use client';

import React, { useState } from 'react';
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
  Tabs,
  Tab,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';

export default function OrderModal({ items }) {
  const [formCity, setFormCity] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [selected, setSelected] = React.useState('address');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleFormSubmit = (data, event) => {
    event.preventDefault();
    if (localStorage.getItem('isLogged')) {
      localStorage.setItem('address', `${data.city}-${data.address}`);
    } else {
      sessionStorage.setItem('address', `${data.city}-${data.address}`);
    }
  };

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
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Checkout</ModalHeader>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <ModalBody className="gap-6">
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    variant="underlined"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    disabledKeys={(!errors.city && !errors.address) ? [''] : ['confirmation']}
                  >
                    <Tab
                      key="address"
                      title="Address Information"
                      className="flex flex-col gap-6"
                    >
                      <div className="relative flex flex-col">
                        <Input
                          autoFocus
                          label="City"
                          placeholder="Enter your city name"
                          variant="bordered"
                          isRequired
                          {...register('city', {
                            onChange: (e) => setFormCity(e.target.value),
                            required: 'This field is required',
                            pattern: {
                              value: /^[A-Za-z\s\-]+$/,
                              message:
                                'Invalid city name (only letters, spaces, and hyphens are allowed)',
                            },
                          })}
                        />
                        {errors.city && <p className="absolute px-2 bottom-[-1.25rem] w-fit h-fit text-sm text-red">{errors.city.message}</p>}
                      </div>
                      <div className="relative flex flex-col">
                        <Input
                          label="Address"
                          placeholder="Street, House №, Apartment № (optional)"
                          variant="bordered"
                          isRequired
                          {...register('address', {
                            onChange: (e) => setFormAddress(e.target.value),
                            required: 'This field is required',
                            pattern: {
                              value: /^[A-Za-z\s]+,\s*\d+(?:,\s*\d+)?$/,
                              message:
                                'Invalid address',
                            },
                          })}
                        />
                        {errors.address && <p className="absolute px-2 bottom-[-1.25rem] w-fit h-fit text-sm text-red">{errors.address.message}</p>}
                      </div>
                      <div className="flex py-2 px-1 justify-end">
                        <Link
                          className="text-link-blue"
                          href="/info"
                          size="sm"
                        >
                          Delivery information
                        </Link>
                      </div>
                    </Tab>
                    <Tab
                      key="confirmation"
                      title="Confirmation"
                    >
                      <div className="bg-grey rounded border border-2 border-grey-stroke flex flex-col gap-2">
                        <h3>City</h3>
                        <p>{formCity}</p>
                        <h3>Address</h3>
                        <p>{formAddress}</p>
                      </div>
                    </Tab>
                  </Tabs>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  {
                    selected === 'address'
                      ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <Link
                          size="sm"
                          className="cursor-pointer"
                          onPress={() => setSelected('confirmation')}
                          isDisabled={
                            !((formCity && formAddress) && !(errors.city || errors.address))
                          }
                        >
                          Next
                        </Link>
                      )
                      : (
                        <Button
                          color={selected === 'address' ? 'primary' : 'success'}
                          type="submit"
                        >
                          Confirm
                        </Button>
                      )
                  }
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
