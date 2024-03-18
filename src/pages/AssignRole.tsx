import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { updateUserRoles } from "../store/slicers/userRole";
import { useState, useEffect } from "react";

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

const AssignRole = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);
  const roles = useAppSelector((state) => state.roles.data);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const [assignedRoles, setAssignedRoles] = useState({});

  // Update assigned roles when userRoles change
  useEffect(() => {
    const updatedAssignedRoles = {};
    userRoles.forEach((userRole) => {
      const { userId, roleId } = userRole;
      updatedAssignedRoles[userId] = [
        ...(updatedAssignedRoles[userId] || []),
        roleId,
      ];
    });
    setAssignedRoles(updatedAssignedRoles);
  }, [userRoles]);

  // Drag and drop handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id && over.id && active.id !== over.id) {
      const userId = over.id;
      const roleId = active.id;
      dispatch(updateUserRoles({ userId, roleId }));
    }
  };

  // DND Kit sensors setup
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
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              assignedRoles={assignedRoles[user.id] ?? []}
            />
          ))}
        </div>
        <DragOverlay>
          {({ active }) =>
            active && (
              <div className="absolute z-50 bg-gray-200 p-2 rounded-md">
                {active.name}
              </div>
            )
          }
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const User = ({ user, assignedRoles }) => {
  const { setNodeRef } = useDroppable({
    id: user.id,
  });

  return (
    <div
      ref={setNodeRef}
      id={user.id}
      className="bg-blue-200 hover:bg-blue-300 p-4 rounded-md transition-colors duration-300"
    >
      <h3 className="text-md font-semibold mb-2">{user.name}</h3>
      <ul className="space-y-2">
        {assignedRoles.map((roleId) => (
          <DraggableRole key={roleId} roleId={roleId} />
        ))}
      </ul>
    </div>
  );
};

const DraggableRole = ({ roleId }) => {
  const role = useAppSelector((state) =>
    state.roles.data.find((r) => r.id === roleId)
  );
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: roleId,
    });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-move transition-colors duration-300 ${isDragging ? "opacity-50" : ""}`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
      }}
    >
      {role && role.name}
    </button>
  );
};

export default AssignRole;
