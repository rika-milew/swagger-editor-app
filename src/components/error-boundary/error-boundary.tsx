'use client';

import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { Box, Button, VStack, Heading, Text, HStack } from '@chakra-ui/react';

type ErrorBoundaryProps = {
  children: ReactNode;
  messages: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
  };
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    void error;
    void info;
  }

  public handleReset = (): void => {
    globalThis.location.reload();
  };

  public handleGoHome = (): void => {
    globalThis.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      const { messages } = this.props;
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
        >
          <VStack
            gap={5}
            maxW="md"
            w="full"
            p={8}
            borderRadius="xl"
            borderWidth="1px"
            shadow="lg"
            textAlign="center"
          >
            <Heading size="lg">{messages.title}</Heading>

            <Text color="fg.muted">{messages.description}</Text>

            <HStack gap={4} w="full" justify="center" pt={2}>
              <Button
                variant="outline"
                colorPalette="red"
                px={6}
                minW="140px"
                onClick={this.handleReset}
              >
                {messages.tryAgain}
              </Button>

              <Button
                variant="outline"
                colorPalette="red"
                px={6}
                minW="140px"
                onClick={this.handleGoHome}
              >
                {messages.goHome}
              </Button>
            </HStack>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
