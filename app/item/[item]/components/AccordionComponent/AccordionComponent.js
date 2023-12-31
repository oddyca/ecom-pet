'use client';

import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function AccordionComponent() {
  const itemClasses = {
    title: 'text-xs',
    trigger: 'justify-between',
  };

  return (
    <Accordion
      isCompact
      itemClasses={itemClasses}
    >
      <AccordionItem
        className="text-xs"
        key="1"
        aria-label="Delivery Accordion"
        title="Delivery"
      >
        Delivery is $5.
        <br />
        Free delivery from a $40 order.
      </AccordionItem>
      <AccordionItem
        className="text-xs"
        key="2"
        aria-label="Payment Accordion"
        title="Payment options"
      >
        Pay with bank cards: Mastercard, Visa, American Express, UnionPay, JCB, Maestro.
        <br />
        Pay using an eWallet: PayPal, Amazon Pay, Google Pay, Apple Pay, Yandex, Qiwi, Skrill.
      </AccordionItem>
    </Accordion>
  );
}
