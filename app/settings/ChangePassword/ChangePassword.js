'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { hash } from 'bcryptjs';
import { Input, Button } from '@nextui-org/react';
import { SALT } from '../../../lib/lib';

export default function ChangeName() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleNameSubmit = async (data, event) => {
    event.preventDefault();
    const isLogged = localStorage.getItem('isLogged');

    const parsedUser = JSON.parse(localStorage.getItem(isLogged));
    const hashedPswd = await hash(data.changePassword, SALT);
    parsedUser.password = hashedPswd;
    localStorage.setItem(isLogged, JSON.stringify(parsedUser));
    reset();
  };

  return (
    <form
      key="formSignin"
      className="flex flex-col gap-4 items-start"
      onSubmit={handleSubmit((event, data) => handleNameSubmit(event, data))}
    >
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        className="w-1/2"
        type="password"
        {...register('changePassword', {
          required: 'This field is required',
          pattern: {
            value: /.{4,}/,
            message: 'Password is too short (at least 4 characters)',
          },
        })}
      />
      {errors.changePassword && (<p className="text-red">{errors.changePassword.message}</p>)}
      <Button
        type="submit"
        className="bg-red text-white hover:bg-red-hover px-8"
      >
        Change password
      </Button>
    </form>
  );
}
