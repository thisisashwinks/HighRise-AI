'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { UsageStats } from '@/types/upload';

interface StorageWarningProps {
  usage: UsageStats;
  onDismiss?: () => void;
}

export const StorageWarning: React.FC<StorageWarningProps> = ({ usage, onDismiss }) => {
  const cloudinaryStorage = usage.cloudinary.storage;
  const upstashStorage = usage.upstash.storage;
  const geminiRequests = usage.gemini.requests;

  // Determine warning level
  const getWarningLevel = (percent: number): 'warning' | 'critical' | null => {
    if (percent >= 100) return 'critical';
    if (percent >= 90) return 'critical';
    if (percent >= 70) return 'warning';
    return null;
  };

  const cloudinaryLevel = getWarningLevel(cloudinaryStorage);
  const upstashLevel = getWarningLevel(upstashStorage);
  const geminiLevel = getWarningLevel(geminiRequests);

  const maxLevel = cloudinaryLevel === 'critical' || upstashLevel === 'critical' || geminiLevel === 'critical'
    ? 'critical'
    : cloudinaryLevel === 'warning' || upstashLevel === 'warning' || geminiLevel === 'warning'
    ? 'warning'
    : null;

  if (!maxLevel) return null;

  const getMessage = () => {
    if (cloudinaryStorage >= 100 || upstashStorage >= 100) {
      return 'We\'re at our storage limit. Uploads are temporarily paused while we upgrade our infrastructure.';
    }
    if (cloudinaryStorage >= 90 || upstashStorage >= 90) {
      return `We're approaching our storage limit (${Math.max(cloudinaryStorage, upstashStorage).toFixed(0)}% used). Uploads may be paused soon.`;
    }
    if (cloudinaryStorage >= 70 || upstashStorage >= 70) {
      return `We're growing! Our storage is ${Math.max(cloudinaryStorage, upstashStorage).toFixed(0)}% full. Uploads will continue, but we may need to upgrade soon.`;
    }
    return null;
  };

  const message = getMessage();
  if (!message) return null;

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 rounded-lg border
        ${maxLevel === 'critical' 
          ? 'bg-red-50 border-red-200' 
          : 'bg-yellow-50 border-yellow-200'
        }
      `}
    >
      <AlertTriangle
        className={`
          w-5 h-5 mt-0.5 flex-shrink-0
          ${maxLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}
        `}
      />
      <div className="flex-1">
        <p
          className={`
            text-sm font-medium mb-1
            ${maxLevel === 'critical' ? 'text-red-900' : 'text-yellow-900'}
          `}
        >
          {maxLevel === 'critical' ? 'Storage Limit Reached' : 'Storage Warning'}
        </p>
        <p
          className={`
            text-sm
            ${maxLevel === 'critical' ? 'text-red-700' : 'text-yellow-700'}
          `}
        >
          {message}
        </p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs">
          <span className={maxLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
            Cloudinary: {cloudinaryStorage.toFixed(0)}%
          </span>
          <span className={maxLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
            Redis: {upstashStorage.toFixed(0)}%
          </span>
          {geminiRequests > 70 && (
            <span className={maxLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
              AI API: {geminiRequests.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`
            text-neutral-400 hover:text-neutral-600 transition-colors
            ${maxLevel === 'critical' ? 'hover:text-red-600' : 'hover:text-yellow-600'}
          `}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
