import React from 'react';
import { Award } from 'lucide-react';

const Streaks = ({ streaks }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Streaks</h2>
      <ul className="space-y-2">
        {Object.entries(streaks).map(([category, streak]) => (
          <li key={category} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{category}: {streak} days</span>
            <Award size={20} className={streak > 0 ? 'text-yellow-500' : 'text-gray-400'} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Streaks;