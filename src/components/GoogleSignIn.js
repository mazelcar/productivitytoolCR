import React from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      console.log('Attempting Google Sign In...');
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;