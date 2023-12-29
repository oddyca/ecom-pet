/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Tabs, Tab, Input, Link, Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { hash } from 'bcryptjs';
import { handleSignUpSubmit, handleSignInSubmit } from '../../controller/controller';
import useStore from '../../controller/store/store';
import { SALT } from '../../lib/lib';

import LoadingPage from '../../components/LoadingPage/LoadingPage';

function Spinner() {
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
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
      router.push('/profile');
    } else {
      setPageLoading(false);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm({ mode: 'onChange' });

  const [selected, setSelected] = React.useState('login');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogged, replaceCart, replaceFavs } = useStore();

  if (pageLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="flex min-h-[666px] w-full relative flex-col items-center justify-center p-3">
      <div className="w-full max-w-[1440px] flex justify-center items-center gap-4">
        <div className="flex flex-col items-center bg-white aspect-video min-h-[500px] rounded-lg p-3 border border-2 border-grey-stroke">
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
                key="formSignin"
                className="flex flex-col gap-4"
                onSubmit={handleSubmit((data, event) => handleSignInSubmit(
                  data,
                  event,
                  setServerError,
                  setIsLoading,
                  hash,
                  SALT,
                  replaceCart,
                  replaceFavs,
                  setIsLogged,
                  router,
                  reset,
                ))}
              >
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter username"
                  type="text"
                  {...register('signinUsername', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z0-9_]{3,}$/,
                      message: 'Invalid username (only letters and underscores are allowed)',
                    },
                  })}
                />
                {errors.signinUsername && (<p className="text-red">{errors.signinUsername.message}</p>)}
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...register('signinPassword', {
                    required: 'This field is required',
                    pattern: {
                      value: /.{4,}/,
                      message: 'Password is too short (at least 4 characters)',
                    },
                  })}
                />
                {errors.signinPassword && (<p className="text-red">{errors.signinPassword.message}</p>)}
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
                    <p className="text-red self-center">{serverError}</p>
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
                key="formSignup"
                className="flex flex-col gap-4 h-[300px]"
                onSubmit={handleSubmitSignup((data, event) => handleSignUpSubmit(
                  data,
                  event,
                  setServerError,
                  setIsLoading,
                  setSelected,
                  hash,
                  SALT,
                  resetSignup,
                ))}
              >
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  {...registerSignup('signupUsername', {
                    required: 'This field is required',
                    pattern: {
                      value: /.{4,}/,
                      message: 'Invalid username (only letters and underscores are allowed)',
                    },
                  })}
                />
                {errorsSignup.signupUsername && (<p className="text-red">{errorsSignup.signupUsername.message}</p>)}
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  {...registerSignup('signupEmail', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email',
                    },
                  })}
                />
                {errorsSignup.signupEmail && (<p className="text-red">{errorsSignup.signupEmail.message}</p>)}
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  {...registerSignup('signupPassword', {
                    required: 'This field is required',
                    pattern: {
                      value: /.{4,}/,
                      message: 'Password is too short (at least 4 characters)',
                    },
                  })}
                />
                {errorsSignup.signupPassword && (<p className="text-red">{errorsSignup.signupPassword.message}</p>)}
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
                    isLoading={isLoading}
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
        </div>
      </div>
    </main>
  );
}
