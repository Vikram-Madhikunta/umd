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
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

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
        <div className="text-center space-y-4">
          <p className="text-green-600 font-semibold text-lg">
            ✅ User added successfully!
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
