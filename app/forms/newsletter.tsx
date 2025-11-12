'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [status,    setStatus]    = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg,  setErrorMsg]  = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, _hp: '' }), 
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      setStatus('error');
      setErrorMsg(json?.error || 'Something went wrong');
      return;
    }
    setStatus('success');
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-80">
      <input
        type="text"
        name="_hp"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        onChange={() => {}}
      />

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(151,131,120,1)]"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(151,131,120,1)]"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
        className={`bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 focus:outline-none focus:ring-2
          ${
            errorMsg === 'This email is already subscribed.'
              ? 'border-red-800 focus:border-red-800 focus:border-[rgba(121,101,90,1)]'
              : 'border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:ring-[rgba(151,131,120,1)]'
          }`}
        />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-40 px-6 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] hover:underline hover:underline-offset-4 disabled:opacity-60"
      >
        {status === 'loading' ? 'Signing up…' : 'Sign up'}
      </button>

      {status === 'success' && (
        <p className="text-md text-[#45381d]">You're signed up! Thank you.</p>
      )}
      {status === 'error' && (
        <p className="text-md text-red-800">{errorMsg}</p>
      )}
    </form>
  );
}
