import { Box, Input, Stack, Text } from '@chakra-ui/react';

type Parameter = {
  name: string;
  required?: boolean;
};

type ParametersSectionProps = {
  title: string;
  parameters: Parameter[];
};

export function ParametersSection({
  title,
  parameters,
}: ParametersSectionProps) {
  if (!parameters.length) {
    return null;
  }

  return (
    <Box>
      <Text mb={2} fontWeight="semibold">
        {title}
      </Text>

      <Stack gap={3}>
        {parameters.map((parameter) => (
          <Box key={parameter.name}>
            <Text mb={1}>
              {parameter.name}

              {parameter.required && (
                <Text as="span" color="red.400">
                  {' '}
                  *
                </Text>
              )}
            </Text>

            <Input placeholder={`Enter ${parameter.name}`} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
