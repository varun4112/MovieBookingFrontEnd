"use client"
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import styles from "./home.module.css"
import Link from "next/link";
import BASE_URL from "@/libs/baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })

  // Handle Change to store value in state onchange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  // email validation
  const [emailError, setEmailError] = useState<string>("")
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userInfo.email.length == 0) {
      setEmailError("")
    }
    else if (!emailPattern.test(userInfo.email)) {
      // Setting the error message
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };


  useEffect(() => {
    validateEmail()
  }, [userInfo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInfo.email || !userInfo.password) {
      toast.error('Enter All Feilds', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          "email": userInfo.email,
          "password": userInfo.password,
        }
        );

        const data = response.data;
        const token = data.token
        if (response.status == 200) {
          toast.success('Login Succesfull', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          sessionStorage.setItem("token", token)
          router.push("/dashboard")

        }
      }
      catch (Error) {
        toast.error('Login Failed', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  }


  return (
    <>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpMain}>
          <div className={styles.signUpCol2}>
            <h1 className={styles.signUpHeading}>Sign Up</h1>
            <form className={styles.signUpForm}>

              <label className={styles.signUpLabel} htmlFor="userEmail">Email</label>
              <input type="email" id='userEmail' className={styles.signUpInput} placeholder='Enter Email' name='email' value={userInfo.email} onChange={handleChange} />
              <p className={styles.error}>{emailError}</p>


              <label className={styles.signUpLabel} htmlFor="password">Password</label>
              <input type="password" id='password' className={styles.signUpInput} placeholder='Enter password' name='password' value={userInfo.password} onChange={handleChange} />
              <p className={styles.error}></p>


              <button className={styles.nextButton1} onClick={handleLogin}>Login</button>
              <span>Already have an account? <Link href={"/"} >Login</Link></span>


            </form>
          </div>
        </div>
      </div></>
  );
}
