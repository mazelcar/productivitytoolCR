import React from 'react';
import { MinusCircle } from 'lucide-react';

const ActionLog = ({ logs, removeLog }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Action Log</h2>
      <ul className="space-y-2">
        {logs.map(log => (
          <li key={log.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{log.date} - {log.name} ({log.points} points)</span>
            <button onClick={() => removeLog(log.id)} className="text-red-500">
              <MinusCircle size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionLog;