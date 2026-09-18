import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { AcademicCapIcon, KeyIcon } from '@heroicons/react/24/outline';
import api from '../../api/axios';

export default function ParentLookup() {
  const [regNumber, setRegNumber] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!regNumber || !accessCode) {
      setError('Please provide both registration number and access code.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/parent/lookup', { registrationNumber: regNumber, accessCode });
      navigate('/results', { state: { resultData: res.data } });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials or results not published yet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Check Student Results
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the student's registration number and unique access code to view their academic report.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <Alert type="error" message={error} />}

            <Input
              label="Registration Number"
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="e.g. STU-2023-001"
              icon={AcademicCapIcon}
            />

            <Input
              label="Access Code"
              id="accessCode"
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter 8-character code"
              icon={KeyIcon}
            />

            <div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Verifying...' : 'View Results'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
