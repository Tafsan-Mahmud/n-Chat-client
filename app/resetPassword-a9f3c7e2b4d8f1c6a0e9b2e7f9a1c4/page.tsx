'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import logo from '@/public/images/logo/logoName.png';
import { Loader2Icon } from 'lucide-react';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch('/api/auth/validate-reset-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => setValid(data.valid))
      .catch(() => setValid(false));
  }, [token]);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/signin');
    } else {
      setError('Reset failed. Please try again.');
    }
  };

  // if (!valid) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-slate-500">
  //       Invalid or expired reset link.
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full min-h-screen bg-[#f5f7fb] flex flex-col justify-center items-center">
      <div className="cursor-pointer absolute top-2 left-5 w-[150px] h-[80px]">
        <Image alt="logo" src={logo} />
      </div>

      <div className="bg-[#ffffffbd] p-6 rounded-md w-[380px] border-2 border-white">
        <h1 className="text-xl font-semibold mb-4">
          Create new password
        </h1>

        <Input
          className="bg-white mb-3"
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          className="bg-white"
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 mt-2">
            {error}
          </p>
        )}

        <Button
          onClick={handleReset}
          disabled={loading}
          className="w-full mt-4 bg-blue-800 cursor-pointer hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Please wait…
            </>
          ) : (
            'Reset password'
          )}
        </Button>
      </div>
    </div>
  );
}
