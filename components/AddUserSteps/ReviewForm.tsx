'use client'

import React from 'react';
import { CompleteForm } from '@/lib/types';

type Props = {
  data: CompleteForm;
  onSubmit: () => void;
  onBack: () => void;
};

export default function ReviewForm({ data, onSubmit, onBack }: Props) {
  return (
    <div className="space-y-6 max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Review & Confirm</h2>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-2">
        <p><span className="font-semibold text-gray-700">Name:</span> {data.basicInfo.name}</p>
        <p><span className="font-semibold text-gray-700">Email:</span> {data.basicInfo.email}</p>
        <p><span className="font-semibold text-gray-700">Street:</span> {data.addressInfo.street}</p>
        <p><span className="font-semibold text-gray-700">City:</span> {data.addressInfo.city}</p>
        <p><span className="font-semibold text-gray-700">ZIP:</span> {data.addressInfo.zip}</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors"
          onClick={onSubmit}
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
