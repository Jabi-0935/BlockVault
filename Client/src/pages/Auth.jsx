import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toogle from "../components/Auth/Toogle";
import InputField from "../components/Auth/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;


const Auth = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [Message, setMessage] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...submit } = data;
      const url = !isLogin ? `${apiUrl}/signup` : `${apiUrl}/login`;
      const params = {
        ...(!isLogin && { name: submit.name }),
        email: submit.email,
        password: submit.password,
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "0935",
        },
        body: JSON.stringify(params),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(
          <span className="text-red-500 text-xs">*{result.error}</span>
        );
        return;
      }
      setMessage(
        <span className="text-green-500 text-xs">*{result.message}. Redirecting...</span>
      );
      login(result.user,result.token);
      navigate('/')
    } catch (error) {
      setMessage(
        <span className="text-red-500 text-xs">Network error occurred</span>
      );
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-3 sm:p-5 w-full border-b border-gray-300 min-h-[80vh] flex flex-col flex-grow items-center justify-center text-center bg-[#0d1216] text-white">
        <div className="h-auto min-h-[450px] w-[350px] sm:w-[400px] md:w-[450px] p-3 sm:p-5 border border-gray-300 rounded-2xl flex flex-col items-center justify-start bg-gray-800">
          {/* {This is toogler between login and signup} */}
          <Toogle isLogin={isLogin} setLogin={setLogin} />

          <h1 className="text-xl sm:text-2xl font-bold mt-2 mb-2 text-white">
            {isLogin ? "Log In" : "Create Account"}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full p-1 sm:p-2"
          >
            {/* Full Name */}
            {!isLogin && (
              <div className="flex flex-col w-full">
                <InputField type="text" placeholder="Full Name" name="name" register={register} errors={errors}
                  rules={{
                    required:"Full name is required",
                    minLength:{
                      value:3,
                      message:"Name must be at least 3 characters"
                    },
                  }}
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col w-full">
              <InputField type='text' name='email'  placeholder='Email' register={register} errors={errors} rules={{
                required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",}
              }}/>
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <InputField type='password' name='password' placeholder='Password' register={register} errors={errors}
              rules={{
                required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
              }} />
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="flex flex-col w-full">
                <InputField type='password' name='confirmPassword' placeholder='Confirm Password' register={register} errors={errors}
                rules={{
                  required: "Please confirm your password",
                    validate: (value) => {
                      const password = watch("password");
                      return value === password || "Passwords don't match";
                    },
                }}
                />
              </div>
            )}
            {/* Replace {Message} with: */}
            {/* Submit Button */}
            <div className="submit flex items-center justify-between">
              <button
                type="submit"
                disabled={
                  isLoading ||
                  (!isLogin ? !watch("name") || !watch("email") || !watch("password") || !watch("confirmPassword") || Object.keys(errors).length > 0
                    : !watch("email") || !watch("password") || Object.keys(errors).length > 0)
                }
                className={`border border-white w-fit h-fit font-semibold py-2 px-4 text-sm sm:text-base rounded-md transition-all duration-200 self-center ${
                  isLoading ||
                  (!isLogin? !watch("name") ||  !watch("email") ||  !watch("password") ||  !watch("confirmPassword") ||  Object.keys(errors).length > 0
                    : !watch("email") || !watch("password") || Object.keys(errors).length > 0)
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                {isLoading ? "Loading..." : !isLogin ? "Submit" : "Login"}
              </button>
              {!isLogin && (
                <>
                  <span className="text-xs sm:text-sm mb-1">Or</span>
                  <button 
                  onClick={()=>{
                    setMessage("Not Available");
                  }}
                  type='button' className="border border-white w-fit h-fit text-white font-semibold py-2 px-4 text-sm sm:text-base rounded-md transition-all duration-200 self-center hover:bg-gray-700">
                    Signin as Guest
                  </button>
                </>
              )}
            </div>
            <div className="h-4 text-xs mt-1">{Message && Message}</div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
