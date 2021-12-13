import {
  Container,
  SimpleGrid,
  Box,
  Img,
  GridItem,
  Button,
} from "@chakra-ui/react";

import { NextPage } from "next";
import { AuthWelcome } from "../../components/AuthPage/AuthWelcome";
import { TabsForm } from "../../components/AuthPage/TabsForm";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login: NextPage = () => {
  let router = useRouter();
  let { authOpt } = router.query;
  let gridHeight = `calc(100vh - 80px)`;

  const { signIn } = useContext(AuthContext)

  async function handleSignIn() {
    const data = {
      email: "pedrocosta2406@pm.me",
      password: "pedro123"
    }

    await signIn(data)
  }
  
  return (
    <>
      <Container maxW='full' bgColor='#F4F4F5' p={0}>
        <SimpleGrid columns={[1, 1, 1, 5, 7]} h={gridHeight}>
          <GridItem 
            colSpan={[1, 1, 1, 3, 3]} 
            paddingX={['8', '8', '32', '32', '32']} 
            overflowY={["visible", "scroll"]} 
            py="12" 
            h="100%"
            overflowX="hidden"
          >
            <Box>
              <Button onClick={handleSignIn}>Entrar</Button>
              <AuthWelcome />
              <TabsForm authOption={authOpt} />
            </Box>
          </GridItem>
          <GridItem colSpan={[0, 0, 0, 2, 4]} display={["none", "none", "none", "flex", "flex"]}>
            <Img
              objectFit='cover'
              boxSize='full'
              src='https://images.pexels.com/photos/6474588/pexels-photo-6474588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            />
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Login;
