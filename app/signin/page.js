'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader,
} from '@nextui-org/react';

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [selected, setSelected] = React.useState('login');

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
              <form className="flex flex-col gap-4">
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
                  Need to create an account?
                  {' '}
                  <Link
                    size="sm"
                    onPress={() => setSelected('sign-up')}
                  >
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                  >
                    Login
                  </Button>
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
                    color="primary"
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
