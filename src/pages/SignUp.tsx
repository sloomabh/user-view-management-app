import React from "react";
import Header from "../components/Header";
import CustomInput from "../components/common/CustomInput";
import Button from "../components/common/Button";
import FormExtra from "../components/FormExtra";
import { toast } from "react-toastify";
import { signUpUser } from "../store/slicers/user";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";
import { useFormik } from "formik";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.data);
  const isEmailUnique = (email: string) => {
    const lowerCaseEmail = email.toLowerCase();
    return !users!.some((user) => user.email.toLowerCase() === lowerCaseEmail);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .test("is-unique", "Email is already used", (value) =>
        isEmailUnique(value)
      ),
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
        "Password must contain at least 5 characters, including letters and numbers"
      ),
    confPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
    },
    validationSchema: schema,
    onSubmit: ({ name, email, password }) => {
      dispatch(signUpUser({ name, email, password }));
      toast.success("SignUp successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Signup to create your account "
          paragraph="Already have an account "
          linkName="Login"
          linkUrl="/"
        />
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="mt-8 space-y-4"
        >
          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              labelText="name "
              id="name-address"
              name="name"
              type="name"
              placeholder="name "
              error={formik.touched.name && formik.errors.name}
              isRequired
            />
          </div>

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
              onChange={formik.handleChange("confPassword")}
              onBlur={formik.handleBlur("confPassword")}
              value={formik.values.confPassword}
              labelText="Password"
              id="confPassword"
              name="confPassword"
              type="password"
              placeholder="confirm your Password"
              error={formik.touched.confPassword && formik.errors.confPassword}
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

export default SignUp;
