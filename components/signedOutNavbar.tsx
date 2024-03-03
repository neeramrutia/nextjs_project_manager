import { AppShell, Burger, Grid, Group, LoadingOverlay, NavLink, Text, em } from "@mantine/core";
import { useDisclosure, useMediaQuery, useNetwork } from "@mantine/hooks";
import SignUpWithCred from "./signUpWithCred";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "../public/Demo.module.css";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconFileLike,
  IconFingerprint,
  IconHistory,
  IconHome,
  IconPassword,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Home from "./homeComponent";
import RecentlyUploaded from "./recentlyUploaded";
import MostLiked from "./mostLiked";
import Image from "next/image";
import { notifications } from "@mantine/notifications";
export default function SignedOutNavbar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(8);
  const router = useRouter();
  const { data: session } = useSession();
  const [time , setTime] = useState(true);
  const networkStatus = useNetwork();
  const [toggled , setToggled] = useState(false)
    if(!toggled && !networkStatus.online ){
      notifications.show({
        title : "Network disconnected",
        message : "Trying to connect",
        color:"red",
        loading:true
      })
      setToggled(true)
    }
    if(toggled && networkStatus.online){
      notifications.show({
        title : "Network connected",
        message : "",
        color:"green",
      })
      setToggled(false)
    }
  // const Time = ()=>{
  //   setTimeout(()=>{setTime(false)} , 3000);
  //   console.log(time)
  // }
  // Time()
  // console.log(session);
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
      
        <Group h="100%" px="md" w="100%" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Group>
          <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
          <Text
            size={isMobile ? "md": "xl"}
            fw={"bolder"}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Project Catalog
          </Text>
          </Group>
            {
              !isMobile && (
                <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
              )
            }
            {
              isMobile && (
                <Text></Text>
              )
            }
          
          
          
        </Group>
        
      </AppShell.Header>
     
         
        
      
      <AppShell.Navbar p="md">
      {/* <LoadingOverlay visible={time} loaderProps={{color:"teal" , type:"dots"}}/> */}
        <NavLink
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          label="Home"
          active={8 === active}
          onClick={() => {setActive(8);toggle()}}
          color="cyan"
        />
        <NavLink
          label="Sign Up"
          active={0 === active}
          leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
          childrenOffset={28}
          onClick={() => {setActive(0);}}
          color="cyan"
        >
          <NavLink
            leftSection={<IconBrandGoogle size="1rem" stroke={1.5} />}
            label="Sign Up with google"
            active={1 === active}
            onClick={() => {
              setActive(1);
              signIn("google");
              toggle();
            }}
            color="teal"
          />
          <NavLink
            leftSection={<IconBrandGithub size="1rem" stroke={1.5} />}
            label="Sign Up with github"
            active={2 === active}
            onClick={() => {
              setActive(2);
              signIn("github");
              toggle();
            }}
            color="teal"
          />
          <NavLink
            leftSection={<IconPassword size="1rem" stroke={1.5} />}
            label="Sign Up with Credentials"
            active={3 === active}
            onClick={() => {
              setActive(3);
              toggle();
            }}
            color="teal"
          />
        </NavLink>

        <NavLink
          label="Sign In"
          leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
          childrenOffset={28}
          active={4 === active}
          onClick={() => setActive(4)}
          color="cyan"
        >
          <NavLink
            leftSection={<IconBrandGoogle size="1rem" stroke={1.5} />}
            label="Sign In with google"
            onClick={() =>{ setActive(5) ; signIn("google" , {callbackUrl:"/home"});toggle()}}
            color="teal"
            
            active={5 === active}
          />
          <NavLink
            leftSection={<IconBrandGithub size="1rem" stroke={1.5} />}
            label="Sign In with github"
            onClick={() => {setActive(6) ; signIn("github" , {callbackUrl : "/home"});toggle()}}
            color="teal"
            active={6 === active}
          />
          <NavLink
            leftSection={<IconPassword size="1rem" stroke={1.5} />}
            label="Sign In with Credentials"
            onClick={() => {
              setActive(7);
              router?.push("/api/auth/signin");
            }}
            color="teal"
            active={7 === active}
          />
        </NavLink>
        <NavLink
          leftSection={<IconHistory size="1rem" stroke={1.5} />}
          label="Recently uploaded projects"
          active={9 === active}
          onClick={() => {setActive(9);toggle()}}
          color="cyan"
        />
        <NavLink
          leftSection={<IconFileLike size="1rem" stroke={1.5} />}
          label="Most Liked Projects"
          active={10 === active}
          onClick={() => {setActive(10);toggle()}}
          color="cyan"
        />
      </AppShell.Navbar>
      <AppShell.Main>
        {active == 8 && <Home />}
        {active == 0 && <Home />}
        {active == 4 && <Home />}
        {active == 9 && <RecentlyUploaded />}
        {active == 10 && <MostLiked />}
        {active == 3 && <SignUpWithCred/>}
      </AppShell.Main>
    </AppShell>
  );
}
