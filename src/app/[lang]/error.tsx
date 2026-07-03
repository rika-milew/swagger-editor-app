'use client';

import { Button, Heading, Text, VStack } from '@chakra-ui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <VStack gap={4} py={12}>
      <Heading>Something went wrong</Heading>

      <Text>An unexpected error occurred.</Text>

      <Button onClick={reset}>Try again</Button>
    </VStack>
  );
}
