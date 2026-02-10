'use client';

import React from 'react';
import { LeaderboardEntry } from '@/types/upload';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) {
    return <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
  }
  if (rank === 2) {
    return <Medal className="w-5 h-5 text-neutral-400 fill-neutral-400" />;
  }
  if (rank === 3) {
    return <Award className="w-5 h-5 text-amber-600 fill-amber-600" />;
  }
  return (
    <span className="w-6 h-6 flex items-center justify-center text-sm font-semibold text-neutral-400">
      {rank}
    </span>
  );
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-6 h-6 bg-neutral-200 rounded" />
              <div className="flex-1">
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-1" />
                <div className="h-3 bg-neutral-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-neutral-200 rounded w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Leaderboard</h3>
        <p className="text-sm text-neutral-500 text-center py-4">
          No entries yet. Be the first to upload!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Leaderboard</h3>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.email}
            className={`
              flex items-center gap-3 p-3 rounded-lg transition-colors
              ${entry.rank <= 3 ? 'bg-neutral-50' : ''}
            `}
          >
            <div className="flex-shrink-0">
              {getRankIcon(entry.rank)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-neutral-900 truncate">
                {entry.name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {entry.product}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-neutral-700">
              <span>{entry.karmaPoints}</span>
              <span className="text-xs text-neutral-400">pts</span>
            </div>
          </div>
        ))}
      </div>
      {entries.length >= 10 && (
        <p className="text-xs text-neutral-400 text-center mt-4">
          Showing top {entries.length} contributors
        </p>
      )}
    </div>
  );
};
