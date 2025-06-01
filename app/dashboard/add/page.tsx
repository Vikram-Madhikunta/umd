'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BasicInfo, AddressInfo, User } from '@/lib/types';
import AddressInfoForm from '@/components/AddUserSteps/AdressInfoForm';
import ContactForm from '@/components/AddUserSteps/ContactForm';
import ReviewForm from '@/components/AddUserSteps/ReviewForm';

const Page = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({ name: '', email: '' ,phone : ' '});
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    street: '',
    city: '',
    zip: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);

  const handleFinalSubmit = async () => {
    const newUser: User = {
      id: Date.now(), 
      name: basicInfo.name,
      email: basicInfo.email,
      phone: basicInfo.phone || 'N/A',
      city: addressInfo.city,
    };


    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl p-8 shadow-2xl border border-blue-100 mt-12">
      <h1 className="text-3xl font-extrabold mb-8 text-blue-800 tracking-tight text-center">Add New User</h1>

      <div className="flex justify-center mb-8">
        <div className="flex gap-4">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>1</div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>2</div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === 3 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>3</div>
        </div>
      </div>

      {!isSubmitted ? (
        <>
          {step === 1 && (
            <ContactForm data={basicInfo} onChange={setBasicInfo} onNext={nextStep} />
          )}
          {step === 2 && (
            <AddressInfoForm
              data={addressInfo}
              onChange={setAddressInfo}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <ReviewForm
              data={{ basicInfo, addressInfo }}
              onBack={prevStep}
              onSubmit={handleFinalSubmit}
            />
          )}
        </>
      ) : (
        <div className="text-center space-y-6">
          <p className="text-green-600 font-semibold text-xl flex items-center justify-center gap-2">
            <span className="inline-block bg-green-100 rounded-full p-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            User added successfully!
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition-all duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
