import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import Image from 'next/image' 
import Styles from '../styles/Form.module.css'
import React, {useState} from 'react'

import {HiAtSymbol,HiFingerPrint} from 'react-icons/hi'
import {signIn} from 'next-auth/react'
import { useFormik } from 'formik'
import login_validate from '../lib/validate'
import {useRouter} from 'next/router'

const login = () => {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const formik =useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit
  })

  async function onSubmit(values){
     const status = await signIn('credentials',{
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl:'/'
      })

      if(status.ok) router.push(status.url)

  }

  //Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'http://localhost:3000'})
  }

  //GitHub Handler function
  async function handleGitHubSignin(){
    signIn('github',{callbackUrl:'http://localhost:3000'})
  }

  return (
    <Layout>

     <Head>
       <title>Login</title>
     </Head>  
     <section className="w-3/4 mx-auto flex flex-col gap-10">
       <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
          <p className="w-3/4 mx-auto text-gray-400">enter credentials to login </p>
       </div>
       {/*form */}
       <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
         <div className={`${Styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-600':''}`}>
             <input
             type="email"
             name="email"
             placeholder="Email"
             onChange={formik.handleChange}
             value={formik.values.email}
             className={Styles.input_text}
             {...formik.getFieldProps('email')}
             />
             <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
             </span>
         </div>

          <div className={`${Styles.input_group} ${formik.errors.password && formik.touched.password?'border-rose-600':''}`}>
             <input
             type={`${show?"text":"password"}`}
             name="password"
             placeholder="Password"
             onChange={formik.handleChange}
             value={formik.values.password}
             className={Styles.input_text} 
             {...formik.getFieldProps('password')}
             />
             <span className="icon flex items-center px-4" onClick={() => {setShow(!show) }}>
              <HiFingerPrint size={25}/>
             </span>
         </div>

         {/**loginbutton */}
         <div className="input-button">
              <button type="submit" onChange={formik.onSubmit} value={formik} className={Styles.button}>
                  login
              </button>
         </div>
         <div className="input-button">
              <button type="button" onClick={handleGoogleSignin} className={Styles.button_custom}>
                  sign in with google <Image src={'/assets/google.svg'} width={30} height={30}></Image>
              </button>
         </div> 
         <div className="input-button">
              <button type="button" onClick={handleGitHubSignin} className={Styles.button_custom}>
                  sign in with github  <Image src={'/assets/github.svg'} width={30} height={30}></Image>
              </button>
         </div>
       {/**bottom */}
       <p className="text-center text-gray-40">
        Don't have an account yet?<Link href={'/register'} className="text-blue-400">sign up</Link>
       </p>
       </form>
     </section>       
   </Layout> 
  )
}

export default login