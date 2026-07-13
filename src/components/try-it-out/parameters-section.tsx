import { Box, Input, Stack, Text } from '@chakra-ui/react';
import { type SwaggerParameter } from '@/types/viewer.types';
import type { Dispatch, SetStateAction } from 'react';

type ParametersSectionProps = {
  title: string;
  parameters: SwaggerParameter[];
  paramValues: Record<string, string>;
  onParamChange: Dispatch<SetStateAction<Record<string, string>>>;
};

export function ParametersSection({
  title,
  parameters,
  paramValues,
  onParamChange,
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

            <Input
              p={4}
              placeholder={`Enter ${parameter.name}`}
              value={paramValues[parameter.name] || ''}
              onChange={(e) =>
                onParamChange((prev) => ({
                  ...prev,
                  [parameter.name]: e.target.value,
                }))
              }
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
