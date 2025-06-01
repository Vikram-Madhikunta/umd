import React from 'react';
import { AddressInfo } from '@/lib/types';

type Props = {
  data: AddressInfo;
  onChange: (info: AddressInfo) => void;
  onNext: () => void;
  onBack: () => void;
};

const AddressInfoForm: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <input
        type="text"
        name="street"
        value={data.street}
        onChange={handleChange}
        placeholder="Street"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <input
        type="text"
        name="city"
        value={data.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <input
        type="text"
        name="zip"
        value={data.zip}
        onChange={handleChange}
        placeholder="ZIP Code"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressInfoForm;
