import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Select, Input } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import CustomModal from "../components/common/CustomModal";
import { deleteRole } from "../store/slicers/role";
import { deleteRoleUser } from "../store/slicers/userRole";

const { Option } = Select;
interface DataTableType {
  id?: string;
  name?: string;
  description?: string;
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
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Users List",
    dataIndex: "users",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Roles = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );
  const [open, setOpen] = useState<boolean>(false);
  const [roleId, setRoleId] = useState("");
  const dispatch = useAppDispatch();

  //Get userslist from the store
  const users = useAppSelector((state) => state.users.data);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const roles = useAppSelector((state) => state.roles.data);

  const showModal = (id: string) => {
    setOpen(true);
    setRoleId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    dispatch(deleteRoleUser(roleId));
    dispatch(deleteRole(roleId));
    setOpen(false);
  };

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  const filteredRoles = roles!.filter((role) => {
    const byName = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byUser = selectedUser
      ? userRoles.some(
          (user) => user.roleId === user.id && user.userId === selectedUser
        )
      : true;

    return byName && byUser;
  });

  const dataTable: DataTableType[] = filteredRoles!.map(
    ({ id, name, description }) => {
      // Find the role user for the current role
      const userRolesForRole = userRoles.filter((user) => user.roleId === id);
      // Find the user name based on the userId
      const userNames = userRolesForRole.map((userRole) => {
        const userName = users!.find(
          (user) => user.id === userRole.userId
        )?.name;
        return userName || "UnAssined";
      });
      return {
        id,
        name,
        description,
        users: (
          <div className="flex flex-col">
            {userNames.length === 0 ? (
              <div className="bg-red-400 p-2 rounded-md mb-1 text-center">
                UNASSIGNED
              </div>
            ) : (
              userNames.map((userName, index) => (
                <div
                  key={index}
                  className="bg-primary-600 p-2 rounded-md mb-1 text-center"
                >
                  {userName}
                </div>
              ))
            )}
          </div>
        ),
        action: (
          <>
            <div className="flex flex-col sm:flex-row">
              <Link to={`/home/role/${id}`} className="text-2xl text-blue-500">
                <BiEdit className="inline-block align-text-bottom" />
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
      <h3 className="mb-4 text-2xl font-bold">ROLES</h3>
      <div className="flex space-x-4">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ height: 40 }}
        />
        <Select
          placeholder="Filter by user"
          value={selectedUser}
          style={{ width: 150, height: 30 }}
          onChange={handleUserChange}
          allowClear
        >
          <option value="">All users</option>
          {users!.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
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
          handleDeleteRole(roleId);
        }}
        title="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Roles;
