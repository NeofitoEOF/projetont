import Head from 'next/head'
import loginpic from '../public/image.png'
import TitleNDesc from '../components/TitleNDesc';
import LoginFooter from '../components/LoginFooter';
import ProceedBtn from '../components/ProceedBtn';
import Signup from '../components/signup';
import ForgotPassword from '../components/ForgotPassword';
import LoginBox from '../components/LoginBox';
import Logo from '../components/Logo';
import InputForm from '../components/InputForm'
import RememberCheckbox from '../components/Remember-Checkbox';
import { Form } from '../components/Form';

import Image from 'next/image'
import { Header } from 'styled-icons/open-iconic';
import Script from 'next/script';
import { useForm } from "react-hook-form";
import React from "react";
import { useState } from 'react';
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

function Home() {

  const router = useRouter()
  const [formLogin, setFormLogin] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInput = (event) => {
    const key = event.target.getAttribute('name');
    const value = event.target.value;

    setFormLogin({
      ...formLogin,
      [key]: value
    })
  }

  const onSubmit = async (data) => {

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formLogin)
      })

      const [, token] = (await response.json()).split(' ')
      if (!!token) {
        localStorage.setItem('token', token)
        router.push('/welcomePage')
      }
      console.log(token)
    } catch (error) {
      console.log(error)
    }

  }


  return (

    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      </Head>

      <div className="container-index">
        <Logo logoType="login-logo" classDiv="login-image">
          <Image src={loginpic} />
        </Logo>

        <LoginBox>

          <TitleNDesc className="login-head" title="Login" description="Welcome! log in and take the opportunty to update your to-do list" />

          <Form onSubmit={handleSubmit(onSubmit)}>

            <InputForm className="input-form" id="username" errors={errors} type='text' options={{ required: { value: true, message: "You need to enter a username" } }}
              registerForm={register} name="username" label="Username" handleInput={handleInput} value={formLogin.username} />

            <InputForm className="input-form" id="password" errors={errors} type='password' options={{ required: { value: true, message: "You need to enter a password" } }}
              registerForm={register} name="password" label="Password" handleInput={handleInput} value={formLogin.password} />

            <RememberCheckbox />

            <ProceedBtn divName="btn-container" btnId="btn-login" text="Login" />
          </Form>
          <LoginFooter>
            <Signup />
            <ForgotPassword />
          </LoginFooter>

        </LoginBox>
      </div>


    </div>

  )
}
export default Home;
