import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Select, Input } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import CustomModal from "../components/common/CustomModal";
import { deleteUser } from "../store/slicers/user";
import { deleteUserRoles } from "../store/slicers/userRole";

const { Option } = Select;
interface DataTableType {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  role?: JSX.Element;
  action?: JSX.Element;
}
const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();

  //Get userslist from the store
  const users = useAppSelector((state) => state.users.data);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const roles = useAppSelector((state) => state.roles.data);

  const showModal = (id: string) => {
    setOpen(true);
    setUserId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUserRoles(userId)); // Delete user roles first
    dispatch(deleteUser(userId)); // Then delete the user
    setOpen(false);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const filteredUsers = users.filter((user) => {
    const byName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byRole = selectedRole
      ? userRoles.some(
          (role) => role.userId === user.id && role.roleId === selectedRole
        )
      : true;

    return byName && byRole;
  });

  const dataTable: DataTableType[] = filteredUsers.map(
    ({ id, name, email, mobile }) => {
      // Find the user role for the current user
      const userRolesForUser = userRoles.filter((role) => role.userId === id);
      // Find the role name based on the roleId
      const roleNames = userRolesForUser.map((userRole) => {
        const roleName = roles!.find(
          (role) => role.id === userRole.roleId
        )?.name;
        return roleName;
      });

      return {
        id,
        name,
        email,
        mobile,
        role: (
          <div className="flex flex-col">
            {roleNames.map((role, index) => (
              <div
                key={index}
                className="bg-primary-600 p-2 rounded-md mb-1 text-center"
              >
                {role}
              </div>
            ))}
          </div>
        ),

        action: (
          <>
            <div className="flex flex-col sm:flex-row">
              <Link to={`/home/user/${id}`} className="text-2xl text-blue-500">
                <BiEdit className="inline-block align-text-bottom" />
              </Link>
              <Link
                className="ms-0 sm:ms-3 mt-3 sm:mt-0 text-2xl text-blue-500"
                to={`/home/user-list/${id}`}
              >
                <AiOutlineEye className="inline-block align-text-bottom" />
              </Link>
              <button
                className="ms-0 sm:ms-3 mt-3 sm:mt-0 text-2xl text-red-500 bg-transparent border-0"
                onClick={() => {
                  showModal(id);
                }}
              >
                <AiFillDelete className="inline-block align-text-bottom" />
              </button>
            </div>
          </>
        ),
      };
    }
  );
  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">USERS</h3>
      <div className="flex space-x-4">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ height: 40 }} // Set a fixed height for the input
        />
        <Select
          placeholder="Filter by role"
          value={selectedRole}
          style={{ width: 150, height: 30 }} // Set a fixed height for the select
          onChange={handleRoleChange}
          allowClear
        >
          <option value="">All Roles</option>
          {roles!.map((role) => (
            <Option key={role.id} value={role.id}>
              {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-4">
        <Table columns={columns} dataSource={dataTable} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteUser(userId);
        }}
        title="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Users;
