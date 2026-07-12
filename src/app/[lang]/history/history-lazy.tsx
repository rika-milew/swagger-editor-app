'use client';

import dynamic from 'next/dynamic';
import Loading from './loading';

export const HistoryViewLazy = dynamic(
  () => import('../../../views/history/history').then((mod) => mod.HistoryView),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);
