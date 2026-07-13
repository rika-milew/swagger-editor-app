import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { unauthorized } from 'next/navigation';
import { getSession } from '@/lib/auth/get-session';
import Loading from './loading';

const HistoryView = dynamic(
  () => import('../../../views/history/history').then((mod) => mod.HistoryView),
  { ssr: true },
);

export const metadata = { title: 'History' };

export default async function HistoryPage() {
  const user = await getSession();

  if (!user) {
    unauthorized();
  }

  return (
    <Suspense fallback={<Loading />}>
      <HistoryView />
    </Suspense>
  );
}
