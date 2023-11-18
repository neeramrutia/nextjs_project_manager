"use client"
import { dbconnect } from "../utils/database"
import { useState } from "react";

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { Text } from '@mantine/core';
import { NavLink } from '@mantine/core';
import { IconGauge, IconFingerprint , IconBrandGoogle , IconBrandGithub , IconPassword , IconHome , IconHistory , IconFileLike} from '@tabler/icons-react';
import Home from "../components/homeComponent";


export default function ResponsiveSizes() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(-1);
  // const dbconnection = dbconnect();
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
      <NavLink 
          leftSection={<IconHome size="1rem" stroke={1.5}/>} 
          label="Home" 
          active={8===active}
          onClick={() => setActive(8)}
          color="cyan"
        />  
      <NavLink
        label="Sign Up"
        active={0===active}
        leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
        childrenOffset={28}
        onClick={() => setActive(0)}
        color="cyan"
      >
        <NavLink 
          leftSection={<IconBrandGoogle size="1rem" stroke={1.5}/>} 
          label="Sign Up with google" 
          active={1===active}
          onClick={() => setActive(1)}
          color="teal"
        />
        <NavLink 
          leftSection={<IconBrandGithub size="1rem" stroke={1.5}/>} 
          label="Sign Up with github" 
          active={2===active}
          onClick={() => setActive(2)}
          color="teal"
        />
        <NavLink 
          leftSection={<IconPassword size="1rem" stroke={1.5}/>} 
          label="Sign Up with Credentials" 
          active={3===active}
          onClick={() => setActive(3)}
          color="teal"
        />
      </NavLink>

      <NavLink
        label="Sign In"
        leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
        childrenOffset={28}
        active={4===active}
        defaultOpened
        onClick={() => setActive(4)}
        color="cyan"
      >
        <NavLink 
          leftSection={<IconBrandGoogle size="1rem" stroke={1.5}/>}
          label="Sign In with google" 
          onClick={() => setActive(5)}
          color="teal"
          active={5===active}
        />
        <NavLink 
          leftSection={<IconBrandGithub size="1rem" stroke={1.5}/>}
          label="Sign In with github" 
          onClick={() => setActive(6)}
          color="teal"
          active={6===active}
        />
        <NavLink 
          leftSection={<IconPassword size="1rem" stroke={1.5}/>}
          label="Sign In with Credentials" 
          onClick={() => setActive(7)}
          color="teal"
          active={7===active}
        />
      </NavLink>
      <NavLink 
          leftSection={<IconHistory size="1rem" stroke={1.5}/>} 
          label="Recently uploaded projects" 
          active={9===active}
          onClick={() => setActive(9)}
          color="cyan"
        /> 
        <NavLink 
          leftSection={<IconFileLike size="1rem" stroke={1.5}/>} 
          label="Most Liked Projects" 
          active={10===active}
          onClick={() => setActive(10)}
          color="cyan"
        />       
      </AppShell.Navbar>
      <AppShell.Main>
        Main
        <Home/>
      </AppShell.Main>
    </AppShell>
  );
}