import React, { useState } from 'react';
import { BasicInfo } from '@/lib/types';
import { validateBasicInfo } from '@/lib/schemas';

type Props = {
  data: BasicInfo;
  onChange: (data: BasicInfo) => void;
  onNext: () => void;
};

const ContactForm = ({ data, onChange, onNext }: Props) => {
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const result = validateBasicInfo(data);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error?.errors.forEach((e) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setError(fieldErrors);
    } else {
      setError({});
      onNext();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${error.name ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {error.name && <p className="text-xs text-red-500 mt-1">{error.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${error.email ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {error.email && <p className="text-xs text-red-500 mt-1">{error.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={data.phone || ''}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${error.phone ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        />
        {error.phone && <p className="text-xs text-red-500 mt-1">{error.phone}</p>}
      </div>

      <button
        onClick={handleNext}
        className="w-full py-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-lg shadow-md transition"
      >
        Next
      </button>
    </div>
  );
};

export default ContactForm;
