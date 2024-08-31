import React from 'react';
import { Target } from 'lucide-react';

const TotalPoints = ({ totalPoints, goal }) => {
  const progressPercentage = Math.min((totalPoints / goal) * 100, 100);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Total Points: {totalPoints} / {goal}</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default TotalPoints;