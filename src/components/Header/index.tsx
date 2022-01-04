import { FiMenu } from "react-icons/fi";
import NextLink from "next/link";

import {
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";

import { AuthButtons } from "./AuthButtons";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserAuth } from "./UserAuth";
import { UserAuthDrawer } from "./UserAuthDrawer";

export const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      w='100%'
      maxW='100%'
      bgColor='#fff'
      h='80px'
      boxShadow='md'
      px='12'>
      <Flex align='center' h='100%' justify='space-between'>
        <NextLink href='/'>
          <Heading fontSize='md' as='a' cursor='pointer'>
            Golden Skin
          </Heading>
        </NextLink>

        {!isWideVersion ? (
          <>
            <IconButton
              bgColor='#FFFAF0'
              variant='outline'
              borderColor='#f2bb05'
              color='#1c1c1c'
              onClick={onOpen}
              aria-label='Menu'
              icon={<FiMenu />}
            />
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Configurações</DrawerHeader>

                {isAuthenticated ? (
                  <UserAuthDrawer user={user} />
                ) : (
                  <DrawerBody>
                    <Center>
                      <AuthButtons />
                    </Center>
                  </DrawerBody>
                )}
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <Wrap spacing='4'>
              <NextLink href='/about-us'>
                <Text as='a' cursor='pointer'>
                  Sobre nós
                </Text>
              </NextLink>
              <NextLink href='/rooms'>
                <Text as='a' cursor='pointer'>
                  Encontre um quarto
                </Text>
              </NextLink>
              <NextLink href='/contact-us'>
                <Text as='a' cursor='pointer'>
                  Contactos
                </Text>
              </NextLink>
            </Wrap>

            {isAuthenticated ? <UserAuth /> : <AuthButtons />}
          </>
        )}
      </Flex>
    </Container>
  );
};
