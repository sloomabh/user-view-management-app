import React from "react";
import Header from "../components/Header";
import CustomInput from "../components/common/CustomInput";
import Button from "../components/common/Button";
import FormExtra from "../components/FormExtra";
import { toast } from "react-toastify";
import { signInUser } from "../store/slicers/user";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";
import { useFormik } from "formik";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state) => state.users.data);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),

    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        "Password must contain at least 5 characters, including letters and numbers"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const user = users!.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        dispatch(signInUser(values));
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/home/user-list");
        }, 1000);
      } else {
        toast.error("Invalid credentials");
      }
    },
  });

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account "
          paragraph=" Don't have an account yet ? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="mt-8 space-y-4"
        >
          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              labelText="Email address"
              id="email-address"
              name="email"
              type="email"
              placeholder="Email address"
              error={formik.touched.email && formik.errors.email}
              isRequired
            />
          </div>

          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
              labelText="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              error={formik.touched.password && formik.errors.password}
              isRequired
            />
          </div>

          <FormExtra />
          <Button type="submit" text="Login" />
        </form>
        <ToastContainer
          position="top-right"
          autoClose={900}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </div>
    </div>
  );
};

export default Login;
