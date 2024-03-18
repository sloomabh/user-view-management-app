import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { updateUserRoles } from "../store/slicers/userRole";
import { useState, useEffect } from "react";
import { User } from "../types/User";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const AssignUser = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);
  const roles = useAppSelector((state) => state.roles.data);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const [assignedUsers, setAssignedUsers] = useState({});
  useEffect(() => {
    const updatedAssignedUsers = {};
    userRoles.forEach((userRole) => {
      const { userId, roleId } = userRole;
      updatedAssignedUsers[roleId] = [
        ...(updatedAssignedUsers[roleId] || []),
        userId,
      ];
    });
    setAssignedUsers(updatedAssignedUsers);
  }, [userRoles]);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id && over.id && active.id !== over.id) {
      const userId = active.id;
      const roleId = over.id;
      dispatch(updateUserRoles({ userId, roleId }));
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  return (
    <div className="flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {roles!.map((role) => (
            <Role
              key={role.id}
              role={role}
              assignedUsers={assignedUsers[role.id] ?? []}
              users={users}
            />
          ))}
        </div>
        <DragOverlay>
          {({ active }) =>
            active && (
              <div className="absolute z-50 bg-gray-200 p-2 rounded-md">
                {users.find((user) => user.id === active.id)?.name}
              </div>
            )
          }
        </DragOverlay>
      </DndContext>
    </div>
  );
};
const Role = ({ role, assignedUsers, users }) => {
  const { setNodeRef } = useDroppable({
    id: role.id,
  });

  // Filter out deleted users
  const filteredAssignedUsers = assignedUsers.filter((userId) =>
    users.some((user) => user.id === userId)
  );

  return (
    <div
      ref={setNodeRef}
      id={role.id}
      className="bg-blue-200 hover:bg-blue-300 p-4 rounded-md transition-colors duration-300"
    >
      <h3 className="text-md font-semibold mb-2">{role.name}</h3>
      <ul className="space-y-2">
        {filteredAssignedUsers.map((userId, index) => (
          <DraggableUser
            key={userId}
            userId={userId}
            style={{
              marginBottom:
                index !== filteredAssignedUsers.length - 1 ? "0.5rem" : "0",
            }}
          />
        ))}
      </ul>
    </div>
  );
};

const DraggableUser = ({ userId, style }) => {
  const user = useAppSelector((state) =>
    state.users.data.find((u) => u.id === userId)
  );
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: userId,
    });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-move transition-colors duration-300 ${isDragging ? "opacity-50" : ""}`}
      style={{
        ...style,
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none", // Apply transform if not null
      }}
    >
      {user && user.name}
    </button>
  );
};

export default AssignUser;
