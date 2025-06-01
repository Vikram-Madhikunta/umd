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
     console.log('Field:', e.target.name, 'Value:', e.target.value);
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
    <div className="space-y-4">
      <div>
        <label>Name</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error.name && <p className="text-red-500">{error.name}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error.email && <p className="text-red-500">{error.email}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={data.phone || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
         {error.phone && <p className="text-red-500">{error.phone}</p>} 
      </div>

      <button
        onClick={handleNext}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default ContactForm;
