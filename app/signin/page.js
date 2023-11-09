/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Tabs, Tab, Input, Link, Button,
} from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { userLogin, userSignUp } from '../../controller/controller';
import useStore from '../../controller/store/store';

export function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const [selected, setSelected] = React.useState('login');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLogged, setIsLogged } = useStore();

  const formSignIn = async (username, password) => {
    setServerError('');
    setIsLoading(true);
    const isNewSignUp = localStorage.getItem(`signup-${username}`);
    if (isNewSignUp) {
      setIsLoading(false);
      localStorage.setItem('isLogged', 'true');
      // localStorage.setItem('loginToken', `token-${username}`);
      setIsLogged(true);
    } else {
      const response = await userLogin(username, password);
      setIsLoading(false);

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('loginToken', responseData.token);
        localStorage.setItem('isLogged', 'true');
        setIsLogged(true);
        redirect('/profile');
      } else {
        setServerError(await response.text());
      }
    }

    reset();
  };

  const formSignUp = async (email, username, password) => {
    setIsLoading(true);
    const response = await userSignUp(email, username, password);
    setIsLoading(false);

    if (response.ok) {
      setSelected('login');
      localStorage.setItem(`signup-${username}`, `${password}`);
    } else {
      setServerError(await response.text());
    }

    reset();
  };

  const handleFormSubmit = (data, event) => {
    event.preventDefault();

    if (selected === 'login') {
      formSignIn(data.username, data.password);
    } else {
      formSignUp(data.email, data.newUsername, data.password);
    }
  };

  return (
    <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
      <div className="w-full max-w-[1440px] flex justify-center items-center gap-4">
        <div className="flex flex-col items-center bg-white aspect-video min-h-[500px] rounded-lg p-3 border border-2 border-grey-stroke">
          {
            !isLogged
              && (
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab
                    className="w-full"
                    key="login"
                    title="Login"
                  >
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit(handleFormSubmit)}
                    >
                      <Input
                        isRequired
                        label="Username"
                        placeholder="Enter username"
                        type="text"
                        {...register('username', {
                          required: 'This field is required',
                          pattern: {
                            value: /^[A-Za-z0-9_]+$/,
                            message: 'Invalid username (only letters and underscores are allowed)',
                          },
                        })}
                      />
                      {errors.username && (<p className="text-red">{errors.username.message}</p>)}
                      <Input
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register('password', {
                          required: 'This field is required',
                          pattern: {
                            value: /.{4,}/,
                            message: 'Password is too short (at least 4 characters)',
                          },
                        })}
                      />
                      {errors.password && (<p className="text-red">{errors.password.message}</p>)}
                      <p className="text-center text-small">
                        Need to create an account?
                        {' '}
                        <Link
                          size="sm"
                          onPress={() => setSelected('sign-up')}
                          className="cursor-pointer"
                        >
                          Sign up
                        </Link>
                      </p>
                      <div className="flex flex-col gap-2 items-end">
                        <Button
                          type="submit"
                          className="bg-red text-white hover:bg-red-hover px-8 self-center"
                          isLoading={isLoading}
                          spinner={<Spinner />}
                        >
                          Login
                        </Button>
                        {serverError && (
                        <p className="text-red">{serverError}</p>
                        )}
                      </div>
                    </form>
                  </Tab>
                  <Tab
                    className="w-full"
                    key="sign-up"
                    title="Sign up"
                  >
                    <form
                      className="flex flex-col gap-4 h-[300px]"
                      onSubmit={handleSubmit(handleFormSubmit)}
                    >
                      <Input
                        isRequired
                        label="Name"
                        placeholder="Enter your name"
                        type="text"
                        {...register('newUsername', {
                          required: 'This field is required',
                          pattern: {
                            value: /.{4,}/,
                            message: 'Invalid username (only letters and underscores are allowed)',
                          },
                        })}
                      />
                      {errors.newUsername && (<p className="text-red">{errors.newUsername.message}</p>)}
                      <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                          required: 'This field is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email',
                          },
                        })}
                      />
                      {errors.email && (<p className="text-red">{errors.email.message}</p>)}
                      <Input
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register('password', {
                          required: 'This field is required',
                          pattern: {
                            value: /.{4,}/,
                            message: 'Password is too short (at least 4 characters)',
                          },
                        })}
                      />
                      {errors.password && (<p className="text-red">{errors.password.message}</p>)}
                      <p className="text-center text-small">
                        Already have an account?
                        {' '}
                        <Link
                          size="sm"
                          onPress={() => setSelected('login')}
                        >
                          Login
                        </Link>
                      </p>
                      <div className="flex flex-col gap-2 items-end">
                        <Button
                          type="submit"
                          className="bg-red text-white hover:bg-red-hover px-8 self-center"
                          spinner={<Spinner />}
                        >
                          Sign up
                        </Button>
                        {serverError && (
                          <p className="text-red">{serverError}</p>
                        )}
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              )
          }
        </div>
      </div>
    </main>
  );
}
