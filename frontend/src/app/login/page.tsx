'use client';

import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "@/lib/cognito";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Logging in...");

    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        setMsg("Login successful!");
        // You can redirect or store tokens here as needed
      },
      onFailure: (err) => {
        setMsg(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">
          Login
        </button>
        <div className="text-red-500 text-sm mt-2">{msg}</div>
      </form>
    </div>
  );
}
