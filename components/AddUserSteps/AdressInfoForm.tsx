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
    <div className="space-y-4">
      <input
        type="text"
        name="street"
        value={data.street}
        onChange={handleChange}
        placeholder="Street"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="city"
        value={data.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="zip"
        value={data.zip}
        onChange={handleChange}
        placeholder="ZIP Code"
        className="w-full p-2 border rounded"
      />

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">
          Back
        </button>
        <button onClick={onNext} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressInfoForm;
