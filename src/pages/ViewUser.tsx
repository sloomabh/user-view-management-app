import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { User } from "../types/User";
import { Role } from "../types/Role";

const ViewUser = () => {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userRoles, setUserRoles] = useState<Role[]>([]);

  const users = useAppSelector((state) => state.users.data);
  const userRolesData = useAppSelector((state) => state.userRoles.data);
  const roles = useAppSelector((state) => state.roles.data);

  useEffect(() => {
    const foundUser = users.find((user) => user?.id === id);
    setUser(foundUser);

    const foundUserRoles = userRolesData
      .filter((ur) => ur.userId === id)
      .map((ur) => roles!.find((role) => role.id === ur.roleId))
      .filter((r) => r !== undefined) as Role[];
    setUserRoles(foundUserRoles);
  }, [id, users, userRolesData, roles]);

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      {user ? (
        <>
          <div className="flex justify-center">
            <img
              src={user.image}
              alt={user.name}
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <div>
              <label className="text-gray-600 font-semibold">Email:</label>
              <p className="text-gray-600 ml-2">{user.email}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Mobile:</label>
              <p className="text-gray-600 ml-2">{user.mobile}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Address:</label>
              <p className="text-gray-600 ml-2">{user.address}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Roles:</label>
              <ul className="text-gray-600 ml-2">
                {userRoles.map((role) => (
                  <li key={role.id}>{role.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div>User not found.</div>
      )}
    </div>
  );
};

export default ViewUser;
