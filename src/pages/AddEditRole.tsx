import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRole, updateRole } from "../store/slicers/role";
import { Role } from "../types/Role";
import Button from "../components/common/Button";

const AddEditRole = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getRoleId = location.pathname.split("/")[3];
  const [role, setRole] = useState<Role | null | undefined>(null);

  const roles = useAppSelector((state) => state.roles.data);

  const isNameUnique = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    return !roles?.some((role) => role.name.toLowerCase() === lowerCaseName);
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .test("is-unique", "Name is already used", (value) =>
        isNameUnique(value)
      ),
    description: yup.string().required("Description is required"),
  });

  useEffect(() => {
    if (getRoleId !== undefined) {
      const getRole = roles!.find((role) => role.id === getRoleId);
      setRole(getRole);
    }
  }, [getRoleId, roles]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: role ? role.name : "",
      description: role ? role.description : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getRoleId === undefined) {
        dispatch(addRole(values));
        toast.success("Role added successfully");
        setTimeout(() => {
          navigate("/home/role-list");
        }, 2000);
      } else {
        dispatch(updateRole({ id: getRoleId, ...values }));
        toast.success("User updated successfully");
        setTimeout(() => {
          navigate("/home/role-list");
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold title">
        {getRoleId !== undefined ? "Edit" : "Add"} Role
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
              isRequired={getRoleId === undefined}
            />
          </div>

          <div className="-space-y-2">
            <CustomInput
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.description}
              labelText="description "
              id="description"
              name="description"
              type="description"
              placeholder="Enter description"
              error={formik.touched.description && formik.errors.description}
              isRequired={getRoleId === undefined}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              text={getRoleId !== undefined ? "Edit User" : "Add User"}
              addClassName="w-1/4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRole;
