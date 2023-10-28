'use client';

import React, { useState } from 'react';
import {
  Image,
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
  RadioGroup,
  Radio,
  cn,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import useStore from '../../../controller/store/store';

export function CustomRadio(props) {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-grey-selected',
        ),
      }}
    >
      {children}
    </Radio>
  );
}

export default function OrderModal({ items, totalOrderSum = 0 }) {
  const [formCity, setFormCity] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [selected, setSelected] = React.useState('address');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const { resetCart } = useStore();

  const handleNext = () => {
    setSelected('confirmation');
    if (localStorage.getItem('isLogged')) {
      localStorage.setItem('address', `${formCity}-${formAddress}`);
    } else {
      sessionStorage.setItem('address', `${formCity}-${formAddress}`);
    }
  };

  const renderAddressCards = () => {
    const city = sessionStorage.getItem('address')?.slice(0, sessionStorage.getItem('address').indexOf('-')) || formCity;
    const address = sessionStorage.getItem('address')?.slice(sessionStorage.getItem('address').indexOf('-') + 1) || formAddress;

    return (
      <RadioGroup className="flex flex-col gap-2">
        <CustomRadio
          className="flex justify-between items-center gap-8 border border-2 border-grey-selected bg-grey p-3 rounded-lg"
          description={`${city}・${address}`}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">
              {city}
              ,
              {' '}
              {address.slice(0, address.indexOf(','))}
            </h2>
          </div>
          <Image
            src="/check.svg"
            width={20}
            height={14}
            alt="checkmark icon"
          />
        </CustomRadio>
      </RadioGroup>
    );
  };

  const handleFormSubmit = (data, event) => {
    event.preventDefault();

    resetCart();
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
              <form onSubmit={() => {
                handleSubmit(handleFormSubmit);
                onClose();
              }}
              >
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
                      <div className="flex py-2 px-1 justify-between">
                        <p className="text-[#C9C9C9] text-sm flex items-center gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 5.44444V8.22222M6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6C11 8.76142 8.76142 11 6 11ZM6.02767 3.77778V3.83333L5.97233 3.83344V3.77778H6.02767Z"
                              stroke="#C9C9C9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          To save address information, please sign up
                        </p>
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
                      className="flex flex-col gap-4"
                    >
                      <p className="text-sm text-black">Delivery address</p>
                      <div className="flex gap-4">
                        {renderAddressCards()}
                      </div>
                      <hr />
                      <div className="flex flex-col gap-5 self-center bg-grey max-w-[60%] p-5">
                        <h2 className="self-center font-bold text-lg">Your order</h2>
                        <div className="flex flex-col gap-2">
                          {items.map((item) => (
                            <div className="flex items-end gap-1">
                              <p className="font-medium">{item.title}</p>
                              <div className="border-b-3 border-dotted w-full" />
                              <p>
                                $
                                {item.price}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="border-b-2 border-dashed w-full border-black" />
                        <div className="flex items-end gap-1">
                          <p className="text-lg font-medium">TOTAL</p>
                          <div className="border-b-3 border-dotted w-full" />
                          <p className="text-lg font-medium">
                            $
                            {totalOrderSum}
                          </p>
                        </div>
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
                          onPress={() => handleNext()}
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
