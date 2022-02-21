import React, { ReactNode, useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  useColorMode,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiMoon,
  FiLogIn,
} from 'react-icons/fi';
import {
  GiMeeple
} from 'react-icons/gi'
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import SupaAuth from '../Auth/supaauth';
import { supabase } from '../Auth/supabase';




function setItems() {
  
  interface LinkItemProps {
    name: string;
    icon: IconType;
    pagelink: string;
  }
  const Items: Array<LinkItemProps> = [
      { name: 'Login', icon: FiLogIn, pagelink: '#' },
    ];
  return Items
}

const LinkItems = setItems()

export default function UnAuthedSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = supabase.auth.session()  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      {session ? '' : <SupaAuth /> } 
       {children}
      </Box>
      
      
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { toggleColorMode } = useColorMode()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          BGDT
        </Text>
        <IconButton aria-label="Toggle Darkmode" variant="outline" icon={<FiMoon />} onClick={toggleColorMode} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} name={link.name} icon={link.icon} pagelink={link.pagelink}>
          {link.name}
        </NavItem>
      ))}
    </Box>
   
  );
};





interface NavItemProps extends FlexProps {
  icon: IconType;
  name: ReactText;
  pagelink: string;
  children: ReactText;
}
const NavItem = ({ icon, name, pagelink, children, ...rest }: NavItemProps) => {
  return (
    <Link href={pagelink} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { toggleColorMode } = useColorMode()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}>
      {/* <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      /> */}

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        BGDT
      </Text>
      <IconButton aria-label="Toggle Darkmode" variant="outline" icon={<FiMoon />} onClick={toggleColorMode} />
    </Flex>
  );
};