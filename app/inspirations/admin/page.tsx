'use client';

import React, { useState, useEffect } from 'react';
import { UsageStats, FeatureFlags } from '@/types/upload';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';

export default function AdminPage() {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from localStorage or prompt
    const savedEmail = localStorage.getItem('uploadFormData');
    if (savedEmail) {
      try {
        const parsed = JSON.parse(savedEmail);
        setEmail(parsed.email || '');
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const fetchStats = async () => {
    if (!email) {
      const input = prompt('Enter your email to access admin dashboard:');
      if (!input) return;
      setEmail(input);
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/usage?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (data.success) {
        setUsage(data.usage);
        setFlags(data.flags);
      } else {
        alert(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      alert('Failed to fetch admin stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const getUsageColor = (percent: number) => {
    if (percent >= 100) return 'text-red-600';
    if (percent >= 90) return 'text-red-500';
    if (percent >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUsageBarColor = (percent: number) => {
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 90) return 'bg-red-400';
    if (percent >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Inspirations', href: '/inspirations' },
          { label: 'Admin' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-neutral-700">
          Monitor usage and manage feature flags
        </p>
      </div>

      {!email ? (
        <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
          <p className="text-neutral-600 mb-4">Enter your email to access the admin dashboard</p>
          <Button onClick={() => {
            const input = prompt('Enter your email:');
            if (input) setEmail(input);
          }}>
            Enter Email
          </Button>
        </div>
      ) : loading ? (
        <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
          <p className="text-neutral-600">Loading...</p>
        </div>
      ) : usage && flags ? (
        <div className="space-y-6">
          {/* Usage Stats */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Usage Statistics</h2>
            
            <div className="space-y-6">
              {/* Cloudinary */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-neutral-700">Cloudinary Storage</span>
                  <span className={`text-sm font-semibold ${getUsageColor(usage.cloudinary.storage)}`}>
                    {usage.cloudinary.storage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getUsageBarColor(usage.cloudinary.storage)}`}
                    style={{ width: `${Math.min(100, usage.cloudinary.storage)}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">Free tier: 10GB</p>
              </div>

              {/* Upstash Redis */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-neutral-700">Upstash Redis Storage</span>
                  <span className={`text-sm font-semibold ${getUsageColor(usage.upstash.storage)}`}>
                    {usage.upstash.storage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getUsageBarColor(usage.upstash.storage)}`}
                    style={{ width: `${Math.min(100, usage.upstash.storage)}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">Free tier: 256MB</p>
              </div>

              {/* Gemini API */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-neutral-700">Gemini API (Daily)</span>
                  <span className={`text-sm font-semibold ${getUsageColor(usage.gemini.requests)}`}>
                    {usage.gemini.requests.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getUsageBarColor(usage.gemini.requests)}`}
                    style={{ width: `${Math.min(100, usage.gemini.requests)}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">Free tier: 1,000 requests/day</p>
              </div>
            </div>
          </div>

          {/* Feature Flags */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Feature Flags</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Uploads</p>
                  <p className="text-sm text-neutral-600">
                    {flags.uploads.enabled ? 'Enabled' : 'Disabled'}
                  </p>
                  {flags.uploads.reason && (
                    <p className="text-xs text-red-600 mt-1">{flags.uploads.reason}</p>
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  flags.uploads.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {flags.uploads.enabled ? 'ON' : 'OFF'}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">AI Generation</p>
                  <p className="text-sm text-neutral-600">
                    {flags.aiGeneration.enabled ? 'Enabled' : 'Disabled'}
                  </p>
                  {flags.aiGeneration.reason && (
                    <p className="text-xs text-red-600 mt-1">{flags.aiGeneration.reason}</p>
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  flags.aiGeneration.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {flags.aiGeneration.enabled ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={fetchStats} variant="secondary" theme="neutral">
              Refresh Stats
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
