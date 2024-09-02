"use client"
import styles from "./home.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "@/libs/baseUrl";
import { useRouter } from "next/navigation";

function Register() {
    const router = useRouter()

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
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

    // validate Name
    const [nameError, setNameError] = useState("")
    const nameValidation = () => {
        if (userInfo.name.length > 0 && userInfo.name.length < 3) {
            setNameError("Name length Should Be Greater Than 3")
        }
        else {
            setNameError("")
        }
    }

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

    // Phone Error Validation
    const [phoneError, setPhoneError] = useState("")
    const phoneValidation = () => {
        if (userInfo.phone.length > 0 && userInfo.phone.length < 10) {

            setPhoneError("Please Enter Valid Phone Number")
        }
        else {
            setPhoneError("")
        }
    }

    useEffect(() => {
        validateEmail()
        phoneValidation()
        nameValidation()
    }, [userInfo])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.phone) {
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
                const response = await axios.post(`${BASE_URL}/register`, {
                    "userName": userInfo.name,
                    "name": userInfo.name,
                    "email": userInfo.email,
                    "phone": userInfo.phone,
                    "password": userInfo.password,
                }
                );
                if (response.status == 200) {
                    toast.success('Registration Succesfull', {
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
                    router.push("/dashboard")

                }
            }
            catch (Error) {
                toast.error('Registration Failed', {
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
                            <label htmlFor="fullName" className={styles.signUpLabel}>Name</label>
                            <input type="text" id='fullName' className={styles.signUpInput} placeholder='Enter Your Name' name='name' value={userInfo.name} onChange={handleChange} />
                            <p className={styles.error}>{nameError}</p>


                            <label className={styles.signUpLabel} htmlFor="userEmail">Email</label>
                            <input type="email" id='userEmail' className={styles.signUpInput} placeholder='Enter Email' name='email' value={userInfo.email} onChange={handleChange} />
                            <p className={styles.error}>{emailError}</p>

                            <label className={styles.signUpLabel} htmlFor="userPhone" >Phone number</label>
                            <input type="number" id='userPhone' className={styles.signUpInput} placeholder='Enter Phone number' name='phone' value={userInfo.phone} onChange={handleChange} />
                            <p className={styles.error}>{phoneError}</p>

                            <label className={styles.signUpLabel} htmlFor="password">Password</label>
                            <input type="password" id='password' className={styles.signUpInput} placeholder='Enter password' name='password' value={userInfo.password} onChange={handleChange} />
                            <p className={styles.error}></p>


                            <button className={styles.nextButton1} onClick={handleRegister}>Register</button>
                            <span>Already have an account? <Link href={"/"} >Login</Link></span>


                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default Register