/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Tabs, Tab, Input, Link, Button,
} from '@nextui-org/react';
import { userLogin } from '../../controller/controller';

export default function Page() {
  const IS_LOGGED = useRef(null);

  useEffect(() => {
    IS_LOGGED.current = localStorage.getItem('isLogged');
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [selected, setSelected] = React.useState('login');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendToServer = async (username, password) => {
    setLoginError('');
    setIsLoading(true);
    const response = await userLogin(username, password);
    setIsLoading(false);
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('loginToken', responseData.token);
      localStorage.setItem('isLogged', 'true');
    } else {
      setLoginError(await response.text());
    }
    reset();
  };

  const handleFormSubmit = (data, event) => {
    event.preventDefault();

    sendToServer(data.username, data.password);
  };

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
                      message:
                        'Invalid username (only letters and underscores are allowed)',
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
                      message:
                        'Password is too short (at least 4 characters)',
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
                    fullWidth
                    type="submit"
                    className="bg-red text-white hover:bg-red-hover"
                    isLoading={isLoading}
                    spinner={(
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
                    )}
                  >
                    Login
                  </Button>
                  {loginError && (
                    <p className="text-red">{loginError}</p>
                  )}
                </div>
              </form>
            </Tab>
            <Tab
              key="sign-up"
              title="Sign up"
            >
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="password"
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
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
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    type="submit"
                    className="bg-red text-white hover:bg-red-hover"
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
