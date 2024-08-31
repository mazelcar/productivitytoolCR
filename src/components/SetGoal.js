import React from 'react';
import { Target } from 'lucide-react';

const SetGoal = ({ goal, setGoal }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Set Goal</h2>
      <div className="flex items-center">
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="border rounded p-2 mr-2"
        />
        <Target size={24} />
      </div>
    </div>
  );
};

export default SetGoal;