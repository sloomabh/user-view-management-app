import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser, updateUser } from "../store/slicers/user";
import { User } from "../types/User";
import Button from "../components/common/Button";

const AddEditUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getUserId = location.pathname.split("/")[3];
  const [user, setUser] = useState<User | null | undefined>(null);
  const users = useAppSelector((state) => state.users.data);

  const isEmailUnique = (email: string) => {
    const lowerCaseEmail = email.toLowerCase();
    return !users.some((user) => user.email.toLowerCase() === lowerCaseEmail);
  };
  const schema = yup.object().shape({
    name: yup.string().required(" Name is Required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .test("is-unique", "Email is already used", (value) =>
        isEmailUnique(value)
      ),
    mobile: yup
      .string()
      .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits")
      .required("Mobile is Required"),
    address: yup.string(),
  });

  useEffect(() => {
    if (getUserId !== undefined) {
      const getUser = users!.find((user) => user.id === getUserId);
      setUser(getUser);
    }
  }, [getUserId, users]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      mobile: user ? user.mobile : "",
      address: user ? user.address : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getUserId === undefined) {
        dispatch(addUser(values));
        toast.success("User added successfully");
        setTimeout(() => {
          navigate("/home/user-list");
        }, 2000);
      } else {
        dispatch(updateUser({ id: getUserId, ...values }));
        toast.success("User updated successfully");
        setTimeout(() => {
          navigate("/home/user-list");
        }, 1000);
      }
    },
  });
  console.log(formik.initialValues);
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold title">
        {getUserId !== undefined ? "Edit" : "Add"} User
      </h3>
      <div>
        <form
          className="mt-8 space-y-4"
          action=""
          onSubmit={formik.handleSubmit}
        >
          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              labelText="name "
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              error={formik.touched.name && formik.errors.name}
              isRequired={getUserId === undefined}
            />
          </div>

          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.email}
              labelText="email "
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              error={formik.touched.email && formik.errors.email}
              isRequired={getUserId === undefined}
            />
          </div>
          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              labelText="mobile "
              id="mobile"
              name="mobile"
              type="text"
              placeholder="Enter mobile"
              error={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              labelText="address "
              id="address"
              name="address"
              type="text"
              placeholder="Enter address"
              error={formik.touched.address && formik.errors.address}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              text={getUserId !== undefined ? "Edit User" : "Add User"}
              addClassName="w-1/4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;
