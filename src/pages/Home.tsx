import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { updateUserRoles } from "../store/slicers/userRole";

const Home = () => {
  const users = useAppSelector((state) => state.users.data);
  const userRoles = useAppSelector((state) => state.userRoles.data);
  const roles = useAppSelector((state) => state.roles.data);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const userId = draggableId;
    const roleId = destination.droppableId;

    dispatch(updateUserRoles({ userId, roleId }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="roles" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-3 gap-4"
          >
            {roles!.map((role) => (
              <div key={role.id}>
                <h2>{role.name}</h2>
                <Droppable droppableId={role.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="p-4 bg-gray-200 rounded-md"
                    >
                      {userRoles
                        .filter((ur) => ur.roleId === role.id)
                        .map((ur) => {
                          const user = users.find((u) => u.id === ur.userId);
                          return (
                            <Draggable
                              key={user!.id}
                              draggableId={user!.id}
                              index={0}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="bg-white p-2 mb-2 rounded-md"
                                >
                                  {user!.name}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Home;
