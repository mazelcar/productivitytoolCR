import React from 'react';

const AddAction = ({ actions, addLog }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add Action</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {actions.map(action => (
          <button
            key={action.name}
            onClick={() => addLog(action)}
            className={`p-2 rounded ${action.points > 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}
          >
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddAction;