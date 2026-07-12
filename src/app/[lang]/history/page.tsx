import { Suspense } from 'react';
import { unauthorized } from 'next/navigation';
import { getSession } from '@/lib/auth/get-session';
import { HistoryView } from '@/views/history/history';
import Loading from './loading';

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
