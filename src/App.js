import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import awsconfig from './aws-exports';
import AddAction from './components/AddAction';
import FilterCategories from './components/FilterCategories';
import ActionLog from './components/ActionLog';
import TotalPoints from './components/TotalPoints';
import Streaks from './components/Streaks';
import ProgressChart from './components/ProgressChart';
import SetGoal from './components/SetGoal';

Amplify.configure(awsconfig);

const App = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [goal, setGoal] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [streaks, setStreaks] = useState({});

  const actions = [
    { name: 'Exercise', category: 'Health', points: 5 },
    { name: 'Eating Healthy', category: 'Health', points: 3 },
  ];

  const categories = ['Health', 'Finance', 'Personal Development'];

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error getting current user:', error);
      setUser(null);
    }
  }

  const handleSignIn = async () => {
    try {
      await signIn();
      checkUser();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addLog = (log) => {
    setLogs([...logs, log]);
  };

  const removeLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Personal Performance Tracker</h1>
        {user ? (
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        ) : (
          <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        )}
      </div>

      <SetGoal goal={goal} setGoal={setGoal} />
      <AddAction actions={actions} addLog={addLog} />
      <FilterCategories 
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <ActionLog logs={logs} removeLog={removeLog} />
      <TotalPoints totalPoints={totalPoints} goal={goal} />
      <Streaks streaks={streaks} />
      <ProgressChart data={logs} categories={selectedCategories} />
    </div>
  );
};

export default App;