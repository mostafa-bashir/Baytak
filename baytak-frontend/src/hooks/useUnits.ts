import { useState, useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import { getCookie } from 'cookies-next';
import { Unit } from '@/interfaces/unit';



interface UnitsResponse {
  success: boolean;
  data: Unit[];
}

export function useUnits(search: string) {
  
  const sessionId = getCookie('sessionId')?.toString() || '';
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    setLoading(true);
    setError(null);

    fetcher<UnitsResponse>(`http://localhost:3000/units${search ? `?search=${encodeURIComponent(search)}` : ''}`, {
      headers: {
        'x-session-id': sessionId || '',
      },
    })
      .then((res) => {
        if (res.success) {
          setUnits(res.data);
        } else {
          setError('Failed to fetch units');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, sessionId]);

  return { units, loading, error };
}
