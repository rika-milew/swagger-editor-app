'use client';

import { useEffect } from 'react';
import { Box, Text, Select, createListCollection } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { swagger } from '@/theme/swagger';
import { useSchemaStore } from '@/store/schema-store';
import { useTranslations } from 'next-intl';

export type BaseUrl = {
  url: string;
  description?: string;
};

type BaseUrlSelectorProps = {
  servers: BaseUrl[];
};

export function BaseUrlSelector({ servers }: BaseUrlSelectorProps) {
  const t = useTranslations('SwaggerViewer');

  const baseUrl = useSchemaStore((state) => state.baseUrl);
  const setBaseUrl = useSchemaStore((state) => state.setBaseUrl);

  const validServers = servers.filter((server) => server.url.trim());

  useEffect(() => {
    const isValid = validServers.some((server) => server.url === baseUrl);
    if ((!baseUrl || !isValid) && validServers.length > 0) {
      setBaseUrl(validServers[0].url);
    }
  }, [baseUrl, validServers, setBaseUrl]);

  if (validServers.length === 0) {
    return null;
  }

  return (
    <Box mb={8} position="relative">
      <Text {...swagger.topText}>{t('baseUrl')}</Text>
      <Select.Root
        collection={createListCollection({
          items: validServers.map((s) => ({ value: s.url, label: s.url })),
        })}
        value={[baseUrl || validServers[0]?.url]}
        onValueChange={(details) => setBaseUrl(details.value[0])}
      >
        <Select.Control color={colors.colorZinc400}>
          <Select.Trigger
            _focus={{
              borderColor: colors.brandPrimary,
              boxShadow: `0 0 0 1px ${colors.brandPrimary}`,
            }}
            _focusVisible={{
              borderColor: colors.brandPrimary,
              boxShadow: `0 0 0 1px ${colors.brandPrimary}`,
            }}
          >
            <Select.ValueText p={2} />
          </Select.Trigger>
        </Select.Control>
        <Select.Content
          bg={colors.background}
          width="100%"
          position="absolute"
          top="100%"
          zIndex="dropdown"
        >
          {validServers.map((s) => (
            <Select.Item
              key={s.url}
              item={s.url}
              width="100%"
              p={2}
              color={colors.colorWhite}
              _hover={{ bg: colors.colorZinc600 }}
              _selected={{ color: colors.brandPrimary }}
            >
              {s.url}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
}
