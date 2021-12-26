import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Img,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Input } from "../components/Finput";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Router from "next/router";
import { api } from "../services/apiClient";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";

type userInfo = {
  email: string;
  role: string;
  user_id: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  nif: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  birthday: string;
};

export const EditProfile: NextPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<userInfo>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    } else {
      const { "nextauth.token": token } = parseCookies();

      api
        .get("/me/myInfo", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          res.data.email && setValue("email", res.data.email);
          res.data.first_name && setValue("firstName", res.data.first_name);
          res.data.last_name && setValue("lastName", res.data.last_name);
          res.data.phone_number &&
            setValue("phoneNumber", res.data.phone_number);
          res.data.birthday && setValue("birthday", res.data.birthday);
          res.data.address &&
            (setValue("street", res.data.address.street),
            setValue("city", res.data.address.city),
            setValue("postalCode", res.data.address.postal_code),
            setValue("country", res.data.address.country));
          res.data.nif && setValue("nif", res.data.nif);

          setUserInfo(res.data);
        });
    }
  }, []);

  const onSubmit = (values: any) => {
    const { "nextauth.token": token } = parseCookies();

    Object.keys(values).map((key) => {
      if (values[key] === "") {
        delete values[key];
      }
    });

    if (values.street || values.city || values.postal_code || values.country) {
      values.address = {
        street: values.street ? values.street : null,
        city: values.city ? values.city : null,
        postal_code: values.postal_code ? values.postal_code : null,
        country: values.country ? values.country : null,
      };
    }

    api
      .put("/me/myInfo", values, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  };

  return (
    <>
      <Head>
        <title>Golden Skin Hotel</title>
        <meta name='description' content='Melhor hotel do mundo' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Text fontFamily='Poppins' mt='20' fontSize='2xl'>
          Editar perfil
        </Text>
        <Center>
          <Flex direction='column' alignItems='center'>
            <Flex direction='column' alignItems='center' mt='10'>
              <Img
                src='aboutUs.png'
                objectFit='cover'
                boxSize='32'
                borderRadius='full'
              />
              <Text
                fontWeight='regular'
                mt='2'
                _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                Alterar foto de perfil
              </Text>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt='3'>
                <SimpleGrid columns={2} rows={5} spacingX={"20px"}>
                  <GridItem colSpan={1}>
                    <FormLabel fontWeight='regular' htmlFor='first_name'>
                      Primeiro nome
                    </FormLabel>
                    <Input
                      defaultValue={userInfo?.first_name && userInfo.first_name}
                      type='text'
                      id='first_name'
                      {...register("first_name")}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel fontWeight='regular' htmlFor='last_name'>
                      Último nome
                    </FormLabel>
                    <Input
                      defaultValue={userInfo?.last_name && userInfo.last_name}
                      type='text'
                      id='last_name'
                      {...register("last_name")}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel fontWeight='regular' htmlFor='telephone'>
                      Telemóvel
                    </FormLabel>
                    <Input
                      defaultValue={
                        userInfo?.phone_number && userInfo.phone_number
                      }
                      type='tel'
                      id='telephone'
                      {...register("telephone")}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel fontWeight='regular' htmlFor='nif'>
                      NIF
                    </FormLabel>
                    <Input
                      defaultValue={userInfo?.nif && userInfo.nif}
                      type='text'
                      id='nif'
                      {...register("nif")}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel fontWeight='regular' htmlFor='country'>
                      País
                    </FormLabel>
                    <Input
                      defaultValue={
                        userInfo?.address?.country && userInfo.address.country
                      }
                      type='text'
                      id='country'
                      {...register("country")}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel fontWeight='regular' htmlFor='street'>
                      Rua
                    </FormLabel>
                    <Input
                      defaultValue={
                        userInfo?.address?.street && userInfo.address.street
                      }
                      type='text'
                      id='street'
                      {...register("street")}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel fontWeight='regular' htmlFor='postal_code'>
                      Código Postal
                    </FormLabel>
                    <Input
                      defaultValue={
                        userInfo?.address?.postal_code &&
                        userInfo.address.postal_code
                      }
                      type='text'
                      id='postal_code'
                      {...register("postal_code")}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel fontWeight='regular' htmlFor='city'>
                      Localidade
                    </FormLabel>
                    <Input
                      defaultValue={
                        userInfo?.address?.city && userInfo.address.city
                      }
                      type='text'
                      id='city'
                      {...register("city")}
                    />
                  </GridItem>
                </SimpleGrid>

                <Center mt='6' mb='20'>
                  <Button
                    color='#fff'
                    bgColor='#F2BB05'
                    _hover={{ bg: "#e0ae09" }}
                    size='lg'
                    type='submit'
                    isLoading={isSubmitting}>
                    Guardar
                  </Button>
                </Center>
              </FormControl>
            </form>
          </Flex>
        </Center>
      </Container>
    </>
  );
};

export default EditProfile;
