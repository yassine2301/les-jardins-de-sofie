import { router } from './runtime';

export function useRouter() { return router; }
export function notFound(): never { throw new Error('Cette page est introuvable.'); }
