// hooks/useUnitDetails.ts
import { useState, useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import { getCookie } from 'cookies-next';
import { Unit } from '@/interfaces/unit';


interface UnitDetailsResponse {
  success: boolean;
  data: Unit;
}

export function useUnitDetails(id?: number) {
      
  const sessionId = getCookie('sessionId')?.toString() || '';
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetcher<UnitDetailsResponse>(`http://localhost:3000/units/${id}`, {
      headers: { 'x-session-id': sessionId || '' },
    })
      .then((res) => {
        if (res.success) setUnit(res.data);
        else setError('Failed to fetch unit details');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, sessionId]);

  return { unit, loading, error };
}
