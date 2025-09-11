'use client';

import React, { createContext, useContext, useState } from 'react';

const SubmissionContext = createContext();

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
};

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (submissionData) => {
    const newSubmission = {
      id: Date.now(), // Simple ID generation
      ...submissionData,
      timestamp: new Date().toISOString()
    };
    setSubmissions(prev => [...prev, newSubmission]);
  };

  const value = {
    submissions,
    addSubmission
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
};