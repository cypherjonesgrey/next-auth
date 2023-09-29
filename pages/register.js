import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import Image from 'next/image'
import Styles from '../styles/Form.module.css'
import React, {useState} from 'react'
import {HiAtSymbol,HiFingerPrint} from 'react-icons/hi'
import {FaUser} from 'react-icons/fa'

import { useFormik } from 'formik'
import {registerValidate} from '../lib/validate'
import {useRouter} from 'next/router'

const register = () => {

  const [show, setShow] = useState({password:false, cpassword:false})
  const router = useRouter()

  const formik = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:'',
      cpassword:'',
    },
    validate: registerValidate,
    onSubmit
  })

  async function onSubmit(values){
    const options = {
      method: 'POST',
      headers: {'Content-Type': application/json},
      body: JSON.stringify(values)
    }

    await fetch('http://localhost:3000/api/auth/signup', options)
    .then(res=>res.json())
    .then((data) => {
      if(data) router.push('http://localhost:3000')
    })
  }

  return (
    <Layout>

     <Head>
       <title>Register</title>
     </Head>   

     <section className="w-3/4 mx-auto flex flex-col gap-10">
       <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">input credentials to register as a user... </p>
       </div>
       {/*form */}
       <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={`${Styles.input_group} ${formik.errors.username && formik.touched.username?'border-rose-600':''}`}>
             <input
             type="text"
             name="username"
             placeholder="Username"
             className={Styles.input_text}
             {...formik.getFieldProps('username')}
             />           
              <span className="icon flex items-center px-4">
                <FaUser size={25} />
             </span>         
         </div>

         <div className={`${Styles.input_group} ${formik.errors.email && formik.touched.email?'border-rose-600':''}`}>
             <input
             type="email"
             name="email"
             placeholder="Email"
             className={Styles.input_text}
             {...formik.getFieldProps('email')}        
             />
             <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
             </span>
         </div>

          <div className={`${Styles.input_group} ${formik.errors.password && formik.touched.password?'border-rose-600':''}`}>
             <input
             type={`${show.password?"text":"password"}`}
             name="password"
             placeholder="Password"
             className={Styles.input_text}
             {...formik.getFieldProps('password')}
             /> 
             <span className="icon flex items-center px-4" onClick={() => {
              setShow({...show, password:!show.password});
             }}>
              <HiFingerPrint size={25}/>
             </span>
         </div>


         <div className={`${Styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword?'border-rose-600':''}`}>
             <input
             type={`${show.cpassword?"text":"password"}`}
             name="cpassword"
             placeholder="Confirm Password"
             className={Styles.input_text}
             {...formik.getFieldProps('cpassword')}
             />
             <span className="icon flex items-center px-4" onClick={() => {
              setShow({...show, password:!show.cpassword});
             }}>
              <HiFingerPrint size={25}/>
             </span>
         </div>
         {formik.errors.cpassword && formik.touched.cpassword?<span className="text-rose-500">{formik.errors.cpassword}</span>:<></>}

         {/**sign up button */}
         <div>
              <button type="submit" className={Styles.button}>
                  sign up
              </button>
         </div>
      <p className="text-center text-gray-400">
        Have an account?<Link href={'/login'} className="text-blue-400">login</Link>
       </p>
       </form>
     </section>  
        
   </Layout>
  )
}

export default register