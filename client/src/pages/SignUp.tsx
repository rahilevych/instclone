// RegistrationPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleInputChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setUsername(value);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   email: validateEmail(value),
    // }));
  };
  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   email: validateEmail(value),
    // }));
  };

  const handleInputChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   password: validatePassword(e.target.value),
      // }));
    }
  };
  const handleInputChangeFullName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      setFullname(e.target.value);
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   password: validatePassword(e.target.value),
      // }));
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, username, password, fullname, navigate);
  };
  // if (user) {
  //   return <Navigate to={'/login'} replace={true} />;
  // }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='mb-8 text-2xl font-bold text-center text-gray-900'>
          Sign up for a new account
        </h2>
        <form className='space-y-6' onSubmit={submitForm} method='post'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'>
              Email
            </label>
            <div className='mt-2'>
              <input
                onChange={handleInputChangeEmail}
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-900'>
              Username
            </label>
            <div className='mt-2'>
              <input
                onChange={handleInputChangeUsername}
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='fullname'
              className='block text-sm font-medium text-gray-900'>
              Full Name
            </label>
            <div className='mt-2'>
              <input
                onChange={handleInputChangeFullName}
                id='fullname'
                name='fullname'
                type='text'
                autoComplete='name'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'>
              Password
            </label>
            <div className='mt-2'>
              <input
                onChange={handleInputChangePass}
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
              Sign up
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-semibold leading-6 text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
