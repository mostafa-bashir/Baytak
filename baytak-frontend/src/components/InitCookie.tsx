'use client';

import { useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

export default function InitSessionId() {
  useEffect(() => {
    const existingId = getCookie('sessionId');

    if (!existingId) {
      const newId = uuidv4();
      setCookie('sessionId', newId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
      console.log('New sessionId set:', newId);
    } else {
      console.log('Existing sessionId found:', existingId);
    }
  }, []);

  return null;
}
