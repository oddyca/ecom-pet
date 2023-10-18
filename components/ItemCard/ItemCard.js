'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import NextImage from 'next/image';
import AddToFavorite from '../AddToFavorite/AddToFavorite';
import Form from '../Form/Form';
import useStore from '../../controller/store/store';
import AddToCart from '../AddToCart/AddToCart';

/* eslint-disable no-nested-ternary */
export default function ItemCard(props) {
  const {
    id, img, price, title, category,
  } = props;
  const { addToCart } = useStore();
  const [isEnetered, setIsEnetered] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleMouseEnter = () => {
    setIsEnetered((state) => !state);
  };

  const cardHovered = 'relative overflow-hidden order-none w-[250px] h-[360px] bg-white rounded-lg';
  const cardNotHovered = 'relative overflow-hidden w-[250px] h-[360px] bg-white rounded-lg border-stroke-light-blue border-[1px]';

  return (
    <div
      className={isEnetered ? 'relative z-30 w-[270px] pt-1 h-min-[524px] grid justify-center items-start' : 'relative z-3 w-[270px] h-min-[524px] grid justify-center items-start pt-1'}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseEnter()}
    >
      <div className="relative p-top-1 z-10 flex flex-col gap-1 w-[250px] rounded-lg">
        <div className="group absolute top-3 right-3 z-40 cursor-pointer hover:scale-110 transition transition-duration-150">
          <AddToFavorite />
        </div>
        <Link href={`/item/${id}`}>
          <div
            style={{
              backgroundImage: `url(${img})`, backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            }}
            className={isEnetered ? cardHovered : cardNotHovered}
          >
            <span className={
              id === 1
                ? 'block absolute bottom-0 left-0 w-max bg-[#EC4D37] text-white text-xs px-2'
                : 'block absolute bottom-0 left-0 w-max bg-black text-white text-xs px-2'
              }
            >
              {
                id === 1 ? '-25%' : id === 2 ? '-10%' : ''
              }
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={id === 1 || id === 2 ? 'line-through text-sm' : 'text-base'}>{`$${price}`}</p>
            {
              (id === 1 || id === 2)
              && (
                <p className={id === 1 ? 'font-bold text-[#EC4D37]' : id === 2 ? 'font-bold' : ''}>
                  $
                  {
                    id === 1 ? Math.round((price - (price * 0.25)) * 100) / 100 : id === 2 ? Math.round((price - (price * 0.1)) * 100) / 100 : ''
                  }
                </p>
              )
            }
          </div>
          <p className="font-bold truncate">{title}</p>
        </Link>
        <Link
          href={`/category/${category}`}
          className="bg-none outline-none"
        >
          <p className="text-sm text-link-blue hover:text-icon-blue">{category}</p>
        </Link>
      </div>
      <div
        className={
        isEnetered
          ? 'absolute flex p-3 drop-shadow-lg z-1 border-stroke-light-blue border-[1px] rounded-lg h-[524px] w-full bg-white'
          : 'absolute top-0 h-full w-full hidden'
        }
      >
        {(category === "men's clothing" || category === "women's clothing")
          ? (
            <>
              <Button
                onPress={onOpen}
                className="flex justify-center self-end items-center w-full py-3.5 px-3 bg-black text-white rounded-lg hover:bg-[#555555]"
              >
                <Image
                  as={NextImage}
                  src="/cart-white.svg"
                  width={16}
                  height={16}
                  alt="cart icon"
                />
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Pick size</ModalHeader>
                      <ModalBody>
                        <Form
                          fetchedInfo={props}
                          setIsEnetered={setIsEnetered}
                          onClose={onClose}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          ) : (
            <form
              className="flex flex-col justify-end h-full w-full"
              onSubmit={(e) => {
                e.preventDefault();
                addToCart(id);
              }}
            >
              <AddToCart />
            </form>
          )}
      </div>
    </div>
  );
}
