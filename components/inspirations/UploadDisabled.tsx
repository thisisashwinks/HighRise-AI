'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface UploadDisabledProps {
  message?: string;
  reason?: string;
}

export const UploadDisabled: React.FC<UploadDisabledProps> = ({
  message = 'Uploads are temporarily paused due to storage limits. Our team is aware and working on a solution. Check back soon!',
  reason,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-neutral-50 rounded-lg border border-neutral-200">
      <AlertCircle className="w-12 h-12 text-neutral-400 mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        Uploads Temporarily Unavailable
      </h3>
      <p className="text-neutral-600 mb-4 max-w-md">
        {message}
      </p>
      {reason && (
        <p className="text-sm text-neutral-500">
          Reason: {reason}
        </p>
      )}
      <p className="text-sm text-neutral-500 mt-4">
        In the meantime, you can still browse existing inspirations and view the leaderboard.
      </p>
    </div>
  );
};
