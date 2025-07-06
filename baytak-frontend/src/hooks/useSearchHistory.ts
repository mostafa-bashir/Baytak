import { useEffect, useState, useCallback } from 'react';
import { getCookie } from 'cookies-next';

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = getCookie('sessionId')?.toString() || '';

  const fetchHistory = useCallback(() => {
    if (!sessionId) return;
    setLoading(true);

    fetch('http://localhost:3000/search-history', {
      headers: {
        'x-session-id': sessionId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHistory(data.data);
        else setError('Failed to fetch search history');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const addSearchTerm = (term: string) => {
    if (!term || !sessionId) return;

    fetch('http://localhost:3000/search-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
      },
      body: JSON.stringify({ searchText: term }),
    })
      .then(() => fetchHistory())
      .catch((err) => console.error('Failed to save search term:', err));
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory, addSearchTerm };
}
