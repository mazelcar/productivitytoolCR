import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusCircle, MinusCircle, Target, Award } from 'lucide-react';

const actions = [
  { name: 'Exercise', category: 'Health', points: 5 },
  { name: 'Eating Healthy', category: 'Health', points: 3 },
  { name: 'Overeating', category: 'Health', points: -3 },
  { name: 'No Exercise', category: 'Health', points: -2 },
  { name: 'Saving Money', category: 'Finance', points: 2 },
  { name: 'Using Credit Card', category: 'Finance', points: -1 },
  { name: 'Studying', category: 'Personal Development', points: 4 },
];

const categories = [...new Set(actions.map(action => action.category))];

const achievements = [
  { name: 'Health Nut', description: 'Reach 50 points in Health', category: 'Health', threshold: 50 },
  { name: 'Money Maestro', description: 'Reach 30 points in Finance', category: 'Finance', threshold: 30 },
  { name: 'Growth Guru', description: 'Reach 40 points in Personal Development', category: 'Personal Development', threshold: 40 },
  { name: 'All-Rounder', description: 'Reach 100 total points', category: 'All', threshold: 100 },
];

const App = () => {
  const [logs, setLogs] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [goal, setGoal] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [streaks, setStreaks] = useState({});
  const [earnedAchievements, setEarnedAchievements] = useState([]);

  useEffect(() => {
    const newTotal = logs.reduce((sum, log) => sum + log.points, 0);
    setTotalPoints(newTotal);

    // Update streaks
    const today = new Date().toLocaleDateString();
    const newStreaks = { ...streaks };
    categories.forEach(category => {
      const categoryLogs = logs.filter(log => log.category === category && log.date === today);
      if (categoryLogs.some(log => log.points > 0)) {
        newStreaks[category] = (newStreaks[category] || 0) + 1;
      } else {
        newStreaks[category] = 0;
      }
    });
    setStreaks(newStreaks);

    // Check for new achievements
    const newAchievements = achievements.filter(achievement => {
      if (achievement.category === 'All') {
        return newTotal >= achievement.threshold && !earnedAchievements.includes(achievement.name);
      } else {
        const categoryTotal = logs
          .filter(log => log.category === achievement.category)
          .reduce((sum, log) => sum + log.points, 0);
        return categoryTotal >= achievement.threshold && !earnedAchievements.includes(achievement.name);
      }
    });
    if (newAchievements.length > 0) {
      setEarnedAchievements([...earnedAchievements, ...newAchievements.map(a => a.name)]);
    }
  }, [logs]);

  const addLog = (action) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...action,
    };
    setLogs([...logs, newLog]);
  };

  const removeLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const filteredLogs = logs.filter(log => selectedCategories.includes(log.category));

  const chartData = filteredLogs.reduce((acc, log) => {
    const existingEntry = acc.find(entry => entry.date === log.date);
    if (existingEntry) {
      existingEntry[log.category] = (existingEntry[log.category] || 0) + log.points;
      existingEntry.total += log.points;
    } else {
      const newEntry = { date: log.date, total: log.points };
      newEntry[log.category] = log.points;
      acc.push(newEntry);
    }
    return acc;
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Personal Performance Tracker</h1>

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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategories(prev => 
                prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
              )}
              className={`p-2 rounded ${selectedCategories.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Action Log</h2>
        <ul className="space-y-2">
          {filteredLogs.map(log => (
            <li key={log.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{log.date} - {log.name} ({log.points} points)</span>
              <button onClick={() => removeLog(log.id)} className="text-red-500">
                <MinusCircle size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Total Points: {totalPoints} / {goal}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${Math.min((totalPoints / goal) * 100, 100)}%`}}></div>
        </div>
      </div>

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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        <ul className="space-y-2">
          {achievements.map(achievement => (
            <li key={achievement.name} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{achievement.name}: {achievement.description}</span>
              <Award size={20} className={earnedAchievements.includes(achievement.name) ? 'text-yellow-500' : 'text-gray-400'} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Progress Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedCategories.map((category, index) => (
              <Line key={category} type="monotone" dataKey={category} stroke={`hsl(${index * 360 / categories.length}, 70%, 50%)`} />
            ))}
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
