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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 3: Review & Confirm</h2>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Name:</strong> {data.basicInfo.name}</p>
        <p><strong>Email:</strong> {data.basicInfo.email}</p>
        <p><strong>Street:</strong> {data.addressInfo.street}</p>
        <p><strong>City:</strong> {data.addressInfo.city}</p>
        <p><strong>ZIP:</strong> {data.addressInfo.zip}</p>
      </div>

      <div className="flex justify-between">
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>
          Back
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={onSubmit}>
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
