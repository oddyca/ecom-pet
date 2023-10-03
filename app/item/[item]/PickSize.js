'use client';

import React from 'react';
import { RadioGroup, Radio, cn } from '@nextui-org/react';

function CustomRadio(props) {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
      }}
    >
      {children}
    </Radio>
  );
}

export default function PickSize() {
  const renderAdditionalInfo = () => {
    const sizes = ['S', 'M', 'L', 'XL'];

    return (sizes.map((size) => (
      <CustomRadio
        key={size}
        descritption={size}
        value={size}
        className="flex gap-2 py-1 px-3 bg-white rounded-sm border-2 border-stroke-light-blue"
      >
        {size}
      </CustomRadio>
    )));
  };

  return (
    <RadioGroup
      label="Pick size"
      orientation="horizontal"
    >
      {renderAdditionalInfo()}
    </RadioGroup>
  );
}
