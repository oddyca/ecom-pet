'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';

export default function ChangeName() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleNameSubmit = (data, event) => {
    event.preventDefault();
    const isLogged = localStorage.getItem('isLogged');

    const parsedUser = JSON.parse(localStorage.getItem(isLogged));
    parsedUser.name = data.changeUsername;
    localStorage.setItem(isLogged, JSON.stringify(parsedUser));
    reset();
  };

  return (
    <form
      className="flex flex-col gap-4 items-start"
      onSubmit={handleSubmit((event, data) => handleNameSubmit(event, data))}
    >
      <Input
        isRequired
        label="Username"
        placeholder="Enter username"
        className="w-1/2"
        type="text"
        {...register('changeUsername', {
          required: 'This field is required',
          pattern: {
            value: /^[A-Za-z0-9_ ]{3,}$/,
            message: 'Invalid username (only letters, spaces and underscores are allowed)',
          },
        })}
      />
      {errors.changeUsername && (<p className="text-red">{errors.changeUsername.message}</p>)}
      <Button
        type="submit"
        className="bg-red text-white hover:bg-red-hover px-8"
      >
        Change name
      </Button>
    </form>
  );
}
