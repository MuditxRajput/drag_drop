import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const formComponents = [
  { id: "input-1", label: "Input Field", type: "input" },
  { id: "textarea-1", label: "Textarea", type: "textarea" },
  { id: "select-1", label: "Select Dropdown", type: "select" },
  { id: "checkbox-1", label: "Checkbox", type: "checkbox" },
  { id: "radio-1", label: "Radio Button", type: "radio" },
  { id: "number-1", label: "Number Input", type: "number" },
  { id: "date-1", label: "Date Picker", type: "date" },
  { id: "file-1", label: "File Upload", type: "file" },
];

const App = () => {
  const [formLayout, setFormLayout] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const newFormLayout = Array.from(formLayout);

    if (source.droppableId === "Sidebar" && destination.droppableId === "FormLayout") {
      const newItem = {
        ...formComponents[source.index],
        id: `${formComponents[source.index].id}-${Date.now()}`,
      };
      newFormLayout.splice(destination.index, 0, newItem);
    } else if (source.droppableId === "FormLayout" && destination.droppableId === "FormLayout") {
      const [reorderedItem] = newFormLayout.splice(source.index, 1);
      newFormLayout.splice(destination.index, 0, reorderedItem);
    }

    setFormLayout(newFormLayout);
  };

  const renderInput = (component) => {
    switch (component.type) {
      case "input":
        return <input type="text" className="border p-2 w-full" placeholder={component.label} />;
      case "textarea":
        return <textarea className="border p-2 w-full" placeholder={component.label}></textarea>;
      case "select":
        return (
          <select className="border p-2 w-full">
            <option value="">{component.label}</option>
          </select>
        );
      case "checkbox":
        return <input type="checkbox" className="mr-2" />;
      case "radio":
        return <input type="radio" className="mr-2" />;
      case "number":
        return <input type="number" className="border p-2 w-full" placeholder={component.label} />;
      case "date":
        return <input type="date" className="border p-2 w-full" />;
      case "file":
        return <input type="file" className="border p-2 w-full" />;
      default:
        return null;
    }
  };

  const isRequired = (index) => index < 3;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex p-6 space-x-8 bg-gray-100 min-h-screen">
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Form Components</h3>
          <Droppable droppableId="Sidebar" isDropDisabled={true}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[300px] p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
              >
                {formComponents.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 mb-4 bg-blue-500 text-white rounded-md cursor-pointer shadow-lg hover:bg-blue-600 transition-all"
                      >
                        {component.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="w-2/3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Form Layout</h3>
          <Droppable droppableId="FormLayout">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[300px] p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
              >
                {formLayout.length === 0 ? (
                  <p className="text-gray-500 text-center">Drag components here to build the form</p>
                ) : (
                  formLayout.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 mb-4 bg-white border ${
                            isRequired(index) ? "border-red-500" : "border-gray-300"
                          } rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition-all`}
                        >
                          <div className="flex-1">{renderInput(component)}</div>
                          <span className="text-gray-800">{component.label}</span>
                          {isRequired(index) && (
                            <span className="text-sm text-red-500">Required</span>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
