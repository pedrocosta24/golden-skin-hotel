import { Box, Button, Container, Divider, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const BigSeparator = () => {
  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Container maxW='full'>
      <Flex
        ml="10"
        mb='10'
        wrap={{ base: "wrap", md: "nowrap" }}>
      
        <Box my='auto' w={{ base: "full", md: "max" }}>
          <Flex
            maxW={{ base: "full", md: "444px" }}
            direction='column'>
            <Flex w='100%' alignItems='center'>
              <Box mr='2'>
                <Text color='#717171' fontWeight='medium' fontSize='lg' w='max'>
                  Origem
                </Text>
              </Box>
              <Divider
                w='60%'
                borderColor='#F2BB05'
                border='1px'
                borderRadius='2px'
              />
            </Flex>

            <Heading color='#1c1c1c' py='4'>
            Como surgiu o Golden Skin Hotel.
            </Heading>
            <Text color='#717171' fontSize='lg' pb='4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget ex eu arcu porta vehicula et non ante.
            </Text>

            <Button
              bgColor='#F2BB05'
              color='#fff'
              _hover={{ bg: "#e0ae09" }}
              w='min-content'
              onClick={() => router.push("/rooms")}
            >
              Fazer reserva
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
