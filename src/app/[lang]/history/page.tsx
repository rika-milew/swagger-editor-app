import { Heading } from '@chakra-ui/react';
import { unauthorized } from 'next/navigation';
import { getSession } from '@/lib/auth/get-session';

export default async function HistoryPage() {
  const user = await getSession();

  if (!user) {
    unauthorized();
  }

  return <Heading as="h1">History</Heading>;
}
