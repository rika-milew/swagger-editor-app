'use client';

import { Drawer, Portal, IconButton, VStack } from '@chakra-ui/react';
import { HiBars3, HiXMark } from 'react-icons/hi2';

import Navigation from './navigation';
import HeaderButtons from './header-buttons';
import { colors } from '@/theme/colors';
import { mobile } from '@/theme/mobile';

export default function MobileMenu() {
  return (
    <Drawer.Root placement="end" size="xs" lazyMount unmountOnExit>
      <Drawer.Trigger asChild>
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          {...mobile.openMenuButton}
        >
          <HiBars3 size={24} />
        </IconButton>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop bg={colors.blackOverlay} />

        <Drawer.Positioner>
          <Drawer.Content {...mobile.menuContent}>
            <Drawer.CloseTrigger asChild>
              <IconButton {...mobile.closeMenuButton}>
                <HiXMark size={24} color={colors.colorWhite} />
              </IconButton>
            </Drawer.CloseTrigger>

            <Drawer.Body pt="20" px="6">
              <VStack align="stretch" gap="6">
                <Navigation direction="column" />

                <HeaderButtons direction="column" />
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
