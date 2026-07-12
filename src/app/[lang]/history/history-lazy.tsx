import dynamic from 'next/dynamic';

export const HistoryViewLazy = dynamic(
  () => import('../../../views/history/history').then((mod) => mod.HistoryView),
  {
    ssr: true,
  },
);
