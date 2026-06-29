import { Box, Flex, Heading } from '@chakra-ui/react';
import { container } from '@/theme/container';

export default function Home() {
  return (
    <Box as="main" flex="1" py="16">
      <Flex
        px="6"
        py="4"
        direction="column"
        gap="6"
        {...container.pageContainer}
      >
        <Heading size="2xl">Swagger Editor App</Heading>
      </Flex>
    </Box>
  );
}
