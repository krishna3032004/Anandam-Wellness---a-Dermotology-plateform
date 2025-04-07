"use client"
import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import { registerUser, verify } from '@/actions/useraction'
import { confirmcode } from '@/actions/useraction'
import { createUser, createDoctor, resetPassword,updateProfile } from '@/actions/useraction'
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode2, setmode2] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Forgot password state
  const [isOTPMode, setIsOTPMode] = useState(false); // OTP input state

  useEffect(() => {
    if (session ) {
      if(session.user.doctor){
        router.push("doctorprofile");
      }else{
        router.push("profile");
      }
    }
  }, [session])

  // Function to validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (isRegistering) {
      if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
      //   if (!form.mobile.trim()) newErrors.mobile = "Mobile Number is required";
      if (!form.email.trim()) newErrors.email = "Email id is required";
      if (!form.password.trim()) newErrors.password = "Password is required";
      if (mode2) {
        if (!form.verification.trim()) newErrors.verification = "verification code is required";

      }
      // if (isDoctor) {
      //   if (!form.license.trim()) newErrors.license = "Medical License is required";
      //   if (!form.specialization.trim()) newErrors.specialization = "Specialization is required";
      //   if (!form.clinic.trim()) newErrors.clinic = "Hospital/Clinic Name is required";
      // }
    } else {
      if (!form.email.trim()) newErrors.email = "Email is required";
      if (!form.password.trim()) newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle user login
  const getdatalogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    let a = await verify(form.email, form.password);
    if (a) {
      console.log(a)
      setMessage(a);
      setIsLoading(false);
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/doctorprofile",
        email: form.email,
        password: form.password,
      });

      console.log(result)
      if (result?.error) {
        setMessage("Invalid credentials");
      }
      // else {
      //   window.location.href = result.callbackUrl;
      // }
      setIsLoading(false);
    }
  };

  // Function to register a new user
  const registeruser = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      console.log(isDoctor)
      const response = await registerUser(form.email, isDoctor);
      if (response === "User already exists") {
        setMessage(response);
        setIsLoading(false);
        return false;
      }
      return true;
    } catch (error) {
      console.log("Registration error:", error);
      setMessage("Registration failed");
      setIsLoading(false);
    }
  };

  const confirm = async () => {
    setIsLoading(true)
    // toast.dismiss();
    let a = await confirmcode(form.verification)
    if (a) {
      if (!isForgotPassword && isDoctor) {
        // await updateProfile(form.email, form.newpassword)
        await createDoctor(form.email, form.password, form.fullName, form.license, form.specialization, form.clinic)
        // setmessage2("Reset password")
        // toast.success('Password changed!', {
        //     position: "bottom-right",
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     stacked: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        // });
        console.log("doctor account created")
      }
      else if (!isForgotPassword && !isDoctor) {
        await createUser(form.email, form.password, form.fullName)
        // toast.success('User Created!', {
        //         position: "bottom-right",
        //         autoClose: 3000,
        //         hideProgressBar: true,
        //         stacked: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     });
        console.log("user created")
      }
      else if (isForgotPassword) {
        console.log("hello man ky hal")
        if (!form.verification.trim()) {
          setErrors({ otp: "OTP is required" });
          return;
        }
        if (!form.newPass.trim()) {
          setErrors({ newPass: "New password is required" });
          return;
        }

        setIsLoading(true);
        console.log(form.email,form.newPass)
        await updateProfile(form.email, form.newPass)
        setIsForgotPassword(false);
        setIsOTPMode(false);
        // setmessage2("Reset password")
        // toast.success('Password changed!', {
        //     position: "bottom-right",
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     stacked: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        // });
      }
      // setform({ username: "", email: "", password: "" })
      setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
      // setmode("EMAIL")
      setmode2(false)
      setIsRegistering(false)
      setIsLoading(false)

    }
    else {
      // toast.warning('Wrong Code!', {
      //         position: "bottom-right",
      //         autoClose: 2000,
      //         hideProgressBar: true,
      //         stacked: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "colored",
      //         transition: Bounce,
      //     });
      console.log("Wrong verification code")
      setIsLoading(false)
    }
  }




  // Function to validate email
  const validateEmail = () => {
    let newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle OTP request
  const handleGetOTP = async () => {
    if (!validateEmail()) return;
    setIsLoading(true);

    try {
      // Simulate sending OTP
      const response = await resetPassword(form.email)
      if (response === "User don't exists") {
        setMessage(response)
        return false
      }
      console.log(`OTP sent to ${form.email}`);
      setMessage2(`OTP sent to ${form.email}`);
      setIsOTPMode(true);
      return true
    } catch (error) {
      setMessage("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle password reset
  const handleResetPassword = async () => {
    if (!form.otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    if (!form.newPassword.trim()) {
      setErrors({ newPassword: "New password is required" });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate updating password

      console.log(`Password updated for ${form.email}`);
      setMessage2("Password updated successfully");
      setIsForgotPassword(false);
      setIsOTPMode(false);
      setForm({ email: "", password: "", otp: "", newPassword: "" });
    } catch (error) {
      setMessage("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <button className={`px-4 py-2 font-semibold ${!isRegistering ? "border-b-2 border-blue-500" : ""}`} onClick={() => {
            setIsRegistering(false)
            setErrors({})
            setMessage("")
            setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
          }}>
            Login
          </button>
          <button className={`px-4 py-2 font-semibold ${isRegistering ? "border-b-2 border-blue-500" : ""}`} onClick={() => {
            setIsRegistering(true)
            setErrors({})
            setMessage("")
            setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
          }

          }>
            Register
          </button>
        </div>

        {isForgotPassword ? (
          !isOTPMode ? (
            // **Step 1: Enter Email to Get OTP**
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <button type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" onClick={async () => {
                let b = await handleGetOTP()
                if (b) {
                  // toast.dismiss();
                  setmode2("confirm")
                  setIsLoading(false)
                  // toast.success(`Code sent to ${form.email}!`, {
                  //   position: "bottom-right",
                  //   autoClose: 3000,
                  //   hideProgressBar: true,
                  //   stacked: false,
                  //   closeOnClick: true,
                  //   pauseOnHover: true,
                  //   draggable: true,
                  //   progress: undefined,
                  //   theme: "colored",
                  // });

                }
                setIsLoading(false)
              }} >
                {isLoading ? "Processing..." : "Get OTP"}
              </button>

              <p className="text-center text-blue-500 cursor-pointer" onClick={() => {setIsForgotPassword(false)
                 setErrors({})
                 setMessage("")
                 setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
              }}>
                Back to Login
              </p>
            </form>
          ) : (
            // **Step 2: Enter OTP & New Password**
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">OTP</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter OTP" value={form.verification ? form.verification : ""} onChange={(e) => setForm({ ...form, verification: e.target.value })} />
                {errors.verification && <p className="text-red-500 text-sm">{errors.verification}</p>}
              </div>

              <div>
                <label className="block text-gray-600 font-medium">New Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Enter new password" value={form.newPass ? form.newPass : ""} onChange={(e) => setForm({ ...form, newPass: e.target.value })} />
                {errors.newPass && <p className="text-red-500 text-sm">{errors.newPass}</p>}
              </div>

              <button type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" onClick={() => confirm()}>
                {isLoading ? "Processing..." : "Confirm"}
              </button>

              <p className="text-center text-blue-500 cursor-pointer" onClick={() => {setIsForgotPassword(false)
                 setErrors({})
                 setMessage("")
                 setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
              }}>
                Back to Login
              </p>
            </form>
          )
        ) :
          !isRegistering ? (
            // **Login Form**
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">

                <div className="text-blue-500 cursor-pointer " onClick={() => {setIsForgotPassword(true)
                   setErrors({})
                   setMessage("")
                   setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
                }}>Forgot password?</div>
              </div>

              <button type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" onClick={getdatalogin}>
                {isLoading ? "Processing..." : "Login"}
              </button>
            </form>
          ) : isDoctor ? (mode2 !== true ?
            // **Doctor Registration Form**
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email Id</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your email id" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* <div>
                <label className="block text-gray-600 font-medium">Medical License Number</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your license number" value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} />
                {errors.license && <p className="text-red-500 text-sm">{errors.license}</p>}
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Specialization</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Your specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
                {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Hospital/Clinic Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Where do you work?" value={form.clinic} onChange={(e) => setForm({ ...form, clinic: e.target.value })} />
                {errors.clinic && <p className="text-red-500 text-sm">{errors.clinic}</p>}
              </div> */}

              <div>
                <label className="block text-gray-600 font-medium">Create Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Choose a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <button onClick={async () => {
                let a = await registeruser()
                if (a) {
                  // toast.dismiss();
                  setmode2(true)
                  setIsLoading(false)
                  setMessage("")
                  console.log("verification code sent")
                  // toast.success(`Verification Code sent to ${form.email}!`, {
                  //         position: "bottom-right",
                  //         autoClose: 3000,
                  //         hideProgressBar: true,
                  //         stacked: false,
                  //         closeOnClick: true,
                  //         pauseOnHover: true,
                  //         draggable: true,
                  //         progress: undefined,
                  //         theme: "colored",
                  //     });
                }
                setIsLoading(false)
              }} type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" >
                {isLoading ? "Processing..." : "Register as Doctor"}
              </button>

              <p className="text-center text-blue-500 cursor-pointer" onClick={() => {
                setIsDoctor(false)
                setErrors({})
                setMessage("")
                setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
              }}>
                Register as a Regular User
              </p>
            </form>
            :
            <form >
              <div>
                <label className="block text-gray-600 font-medium">Email verification</label>
                <input type="text" className="w-full px-3 py-2 border rounded" name='verification' value={form.verification ? form.verification : ""} placeholder='otp' onChange={(e) => setForm({ ...form, verification: e.target.value })} />
                {errors.verification && <p className="text-red-500 text-sm">{errors.verification}</p>}
              </div>

              <button onClick={() => confirm()} type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" >
                {isLoading ? "Processing..." : "confirm"}
              </button>
            </form>
          ) : (mode2 !== true ?
            // **Regular User Registration Form**
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email id</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your email id" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Create Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Choose a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <button onClick={async () => {
                let a = await registeruser()
                if (a) {
                  // toast.dismiss();
                  setmode2(true)
                  setIsLoading(false)
                  console.log("verification code sent")
                  // toast.success(`Verification Code sent to ${form.email}!`, {
                  //         position: "bottom-right",
                  //         autoClose: 3000,
                  //         hideProgressBar: true,
                  //         stacked: false,
                  //         closeOnClick: true,
                  //         pauseOnHover: true,
                  //         draggable: true,
                  //         progress: undefined,
                  //         theme: "colored",
                  //     });
                }
                setIsLoading(false)
              }} type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" >
                {isLoading ? "Processing..." : "Send OTP"}
              </button>

              <p className="text-center text-blue-500 cursor-pointer" onClick={() => {
                setIsDoctor(true)
                setErrors({})
                setMessage("")
                setForm({ fullName: "", email: "", password: "", mobile: "", license: "", specialization: "", clinic: "" })
              }}>
                Are you a doctor? Register Here
              </p>
            </form>
            :
            <form >
              <div>
                <label className="block text-gray-600 font-medium">Email verification</label>
                <input type="text" className="w-full px-3 py-2 border rounded" name='verification' value={form.verification ? form.verification : ""} placeholder='otp' onChange={(e) => setForm({ ...form, verification: e.target.value })} />
                {errors.verification && <p className="text-red-500 text-sm">{errors.verification}</p>}
              </div>

              <button onClick={() => confirm()} type="button" className="w-full px-3 py-2 text-white bg-blue-500 rounded" >
                {isLoading ? "Processing..." : "confirm"}
              </button>
            </form>
          )}

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
        {message2 && <p className="text-blue-600 text-center mt-4">{message2}</p>}
      </div>
    </div>
  );
}
