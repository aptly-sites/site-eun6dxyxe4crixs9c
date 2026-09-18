import { createContext, useContext, useEffect, useState } from 'react';
import { loadRentalData, type RentalData } from './lib/data';
export const RentalDataContext = createContext<RentalData | undefined>(undefined);
export function readInitialRentalData(): RentalData | undefined {
  const content = document.getElementById('rental-data')?.textContent;
  if (!content) return undefined;
  try { return JSON.parse(content); } catch { return undefined; }
}
export function useRentalData(path: string) {
  const initial = useContext(RentalDataContext);
  const [data, setData] = useState(initial);
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const hasCurrentData = Boolean(data && (!data.path || data.path === path));
    const startedAt = Date.now();
    loadRentalData(path).then(value => {
      if (!active) return;
      const minimumTransition = hasCurrentData ? 0 : 450;
      const remaining = Math.max(0, minimumTransition - (Date.now() - startedAt));
      timer = setTimeout(() => { if (active) setData(value); }, remaining);
    });
    return () => { active = false; if (timer) clearTimeout(timer); };
  }, [path]);
  const matchesPath = data && (!data.path || data.path === path);
  return { data: matchesPath ? data : undefined, loading: !matchesPath };
}
