'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { UsageStats } from '@/types/upload';

interface StorageWarningProps {
  usage: UsageStats;
  onDismiss?: () => void;
}

export const StorageWarning: React.FC<StorageWarningProps> = ({ usage, onDismiss }) => {
  const geminiRequests = usage.gemini.requests;

  const getWarningLevel = (percent: number): 'warning' | 'critical' | null => {
    if (percent >= 100) return 'critical';
    if (percent >= 90) return 'critical';
    if (percent >= 70) return 'warning';
    return null;
  };

  const level = getWarningLevel(geminiRequests);
  if (!level) return null;

  const message =
    geminiRequests >= 100
      ? 'AI suggestions are temporarily paused due to daily API limits.'
      : `AI API usage is high (${geminiRequests.toFixed(0)}%). Limits may be reached soon.`;

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 rounded-lg border
        ${level === 'critical' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}
      `}
    >
      <AlertTriangle
        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${level === 'critical' ? 'text-red-600' : 'text-yellow-600'}`}
      />
      <div className="flex-1">
        <p className={`text-sm font-medium mb-1 ${level === 'critical' ? 'text-red-900' : 'text-yellow-900'}`}>
          {level === 'critical' ? 'API Limit Reached' : 'API Usage Warning'}
        </p>
        <p className={`text-sm ${level === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>{message}</p>
        <div className="mt-2 text-xs">
          <span className={level === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
            Gemini API: {geminiRequests.toFixed(0)}%
          </span>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`text-neutral-400 hover:text-neutral-600 transition-colors ${level === 'critical' ? 'hover:text-red-600' : 'hover:text-yellow-600'}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
