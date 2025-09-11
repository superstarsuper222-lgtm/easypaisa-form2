'use client';

import React, { useEffect, useState } from 'react';

const DatabaseStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/db-status');
        const result = await response.json();
        setIsConnected(result.connected);
      } catch (error) {
        console.error('Error checking database status:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded text-sm z-50">
        Checking database connection...
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded text-sm z-50 ${
      isConnected 
        ? 'bg-green-100 border border-green-400 text-green-700' 
        : 'bg-red-100 border border-red-400 text-red-700'
    }`}>
      Database: {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default DatabaseStatus;