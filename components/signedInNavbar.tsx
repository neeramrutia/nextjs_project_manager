import { AppShell, Burger, Button, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "../public/Demo.module.css";
import { IconFileLike, IconHistory, IconHome, IconPlaylistAdd } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Home from "./homeComponent";
import RecentlyUploaded from "./recentlyUploaded";
import MostLiked from "./mostLiked";
import AddProject from "./addingProject/addProject";
export default function SignedInNavbar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(8);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
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
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Text
            size="xl"
            fw={"bolder"}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            NextGen Project Management
          </Text>
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
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          label="Home"
          active={8 === active}
          onClick={() => setActive(8)}
          color="cyan"
        />
        <NavLink
          leftSection={<IconHistory size="1rem" stroke={1.5} />}
          label="Recently uploaded projects"
          active={9 === active}
          onClick={() => setActive(9)}
          color="cyan"
        />
        <NavLink
          leftSection={<IconFileLike size="1rem" stroke={1.5} />}
          label="Most Liked Projects"
          active={10 === active}
          onClick={() => setActive(10)}
          color="cyan"
        />
        {
          (session?.user.isAdmin || session?.user.isCoordinator) && (
            <NavLink
            leftSection={<IconPlaylistAdd size="1rem" stroke={1.5} />}
            label="Add Project"
            active={12 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(12);
            }}
            color="cyan"
          />
          )
        }
        {session && (
          <NavLink
            label="Sign Out"
            active={11 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(11);
              signOut();
            }}
            color="cyan"
          />
        )}
        
      </AppShell.Navbar>
      <AppShell.Main>
        Main
        {active == 8 && <Home />}
        {active == 9 && <RecentlyUploaded />}
        {active == 10 && <MostLiked />}
        {active == 12 && <AddProject />}
      </AppShell.Main>
    </AppShell>
  );
}