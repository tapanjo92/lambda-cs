'use client';

import { useState } from 'react';
import { userPool } from '../../lib/cognito';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = () => {
    setMsg('Signing up...');
    userPool.signUp(email, password, [{ Name: 'email', Value: email }], [], (err, result) => {
      if (err) {
        setMsg(err.message || JSON.stringify(err));
      } else {
        setSignedUp(true);
        setMsg('Signup successful! Please check your email for a verification code (if required).');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign up</h1>
        <input
          className="w-full mb-3 px-4 py-2 border rounded-xl"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-3 px-4 py-2 border rounded-xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 font-semibold"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">{msg}</div>
        {signedUp && (
          <div className="mt-2 text-center">
            <a href="/login" className="text-blue-700 underline">
              Proceed to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
