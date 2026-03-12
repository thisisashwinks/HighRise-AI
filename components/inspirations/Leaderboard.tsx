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
  const containerStyle = {
    backgroundColor: 'var(--color-surface-elevated)',
    border: '1px solid var(--color-border)',
  };

  if (loading) {
    return (
      <div className="rounded-xl p-6" style={containerStyle}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Leaderboard</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="flex-1">
                <div className="h-4 rounded w-3/4 mb-1" style={{ backgroundColor: 'var(--color-border)' }} />
                <div className="h-3 rounded w-1/2" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
              <div className="h-4 rounded w-12" style={{ backgroundColor: 'var(--color-border)' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-xl p-6" style={containerStyle}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Leaderboard</h3>
        <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>
          No entries yet. Be the first to upload!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6" style={containerStyle}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Leaderboard</h3>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.email}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
            style={entry.rank <= 3 ? { backgroundColor: 'var(--color-surface-muted)' } : undefined}
          >
            <div className="flex-shrink-0">
              {getRankIcon(entry.rank)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" style={{ color: 'var(--color-text)' }}>
                {entry.name}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                {entry.product}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              <span>{entry.karmaPoints}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>pts</span>
            </div>
          </div>
        ))}
      </div>
      {entries.length >= 10 && (
        <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-subtle)' }}>
          Showing top {entries.length} contributors
        </p>
      )}
    </div>
  );
};
