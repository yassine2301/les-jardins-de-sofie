import { useEffect, useState } from 'react';

type Resource<T> = { data?: T; error?: Error; pending: boolean };
const cache = new Map<string, { expires: number; promise: Promise<unknown> }>();

function read<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  if (existing && existing.expires > Date.now()) return existing.promise as Promise<T>;
  const promise = loader().catch(error => { cache.delete(key); throw error; });
  cache.set(key, { expires: Date.now() + 60_000, promise });
  return promise;
}

export function useResource<T>(key: string, loader: () => Promise<T>): Resource<T> {
  const [result, setResult] = useState<{ key: string; resource: Resource<T> }>(
    { key, resource: { pending: true } }
  );
  useEffect(() => {
    let active = true;
    read(key, loader).then(data => {
      if (active) setResult({ key, resource: { data, pending: false } });
    }).catch(error => {
      if (active) setResult({ key, resource: {
        error: error instanceof Error ? error : new Error('Chargement indisponible.'), pending: false,
      } });
    });
    return () => { active = false; };
  }, [key, loader]);
  return result.key === key ? result.resource : { pending: true };
}
