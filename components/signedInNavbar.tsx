import {
  AppShell,
  Avatar,
  Burger,
  Button,
  Group,
  LoadingOverlay,
  Menu,
  NavLink,
  Text,
  UnstyledButton,
  em,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import ShowAllProjects from "./showProjects/showAllProjects";
import { IconSun, IconMoon, IconChevronRight } from "@tabler/icons-react";
import cx from "clsx";
import classes from "../public/Demo.module.css";
import {
  IconFileLike,
  IconHistory,
  IconHome,
  IconPlaylistAdd,
  IconUser,
  IconUserCheck,
  IconUserShield,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import Home from "./homeComponent";
import RecentlyUploaded from "./recentlyUploaded";
import MostLiked from "./mostLiked";
import AddProject from "./addingProject/addProject";
import Image from "next/image";
export default function SignedInNavbar() {
  const { setColorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const isTab = useMediaQuery(`(max-width: ${em(770)})`);
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(8);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image?: string | null;
    name?: string;
    email?: string;
    icon?: React.ReactNode;
  }

  const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
      <UnstyledButton
        ref={ref}
        style={{
          padding: "var(--mantine-spacing-md)",
          color: "var(--mantine-color-text)",
          borderRadius: "var(--mantine-radius-sm)",
        }}
        {...others}
      >
        <Group>
          <Avatar src={image} radius="xl" />
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <IconChevronRight size="1rem" />}
        </Group>
      </UnstyledButton>
    )
  );
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
          <Group>
            <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
            <Text
              size={isMobile ? "md" : "xl"}
              fw={"bolder"}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              Project Catalog
            </Text>
          </Group>
          <Group>
            {!isTab && (
              <>
                <Menu>
                  <Menu.Target>
                    <UserButton
                      image={session?.user.image}
                      name={session?.user.name || ""}
                      email={session?.user.email || ""}
                    />
                  </Menu.Target>
                  {/* ... menu items */}
                </Menu>
                <ActionIcon
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === "light" ? "dark" : "light"
                    )
                  }
                  variant="default"
                  size="xl"
                  aria-label="Toggle color scheme"
                >
                  <IconSun
                    className={cx(classes.icon, classes.light)}
                    stroke={1.5}
                  />
                  <IconMoon
                    className={cx(classes.icon, classes.dark)}
                    stroke={1.5}
                  />
                </ActionIcon>
              </>
            )}
            {isMobile && <Text> </Text>}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          label="Home"
          active={8 === active}
          onClick={() => {
            setActive(8);
            toggle();
          }}
          color="cyan"
        />
        <NavLink
          leftSection={<IconHistory size="1rem" stroke={1.5} />}
          label="Recently uploaded projects"
          active={9 === active}
          onClick={() => {
            setActive(9);
            toggle();
          }}
          color="cyan"
        />
        <NavLink
          leftSection={<IconFileLike size="1rem" stroke={1.5} />}
          label="Most Liked Projects"
          active={10 === active}
          onClick={() => {
            setActive(10);
            toggle();
          }}
          color="cyan"
        />
        <NavLink
          label="Show All Projects"
          active={13 === active}
          onClick={() => {
            setActive(13);
            toggle();
          }}
          color="cyan"
        />
        {(session?.user.isAdmin || session?.user.isCoordinator) && (
          <NavLink
            leftSection={<IconPlaylistAdd size="1rem" stroke={1.5} />}
            label="Add Project"
            active={12 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(12);
              toggle();
            }}
            color="cyan"
          />
        )}
        {session?.user.isAdmin && (
          <NavLink
            leftSection={<IconUser size="1rem" stroke={1.5} />}
            label="User List"
            active={14 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(14);
              window.open("/users", "_blank", "noopener");
              toggle();
            }}
            color="cyan"
          />
        )}
        {session?.user.isAdmin && (
          <NavLink
            leftSection={<IconUser size="1rem" stroke={1.5} />}
            label="Co-ordinators List"
            active={16 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(16);
              window.open("/coordinators", "_blank", "noopener");
              toggle();
            }}
            color="cyan"
          />
        )}
        {session?.user.isAdmin && (
          <NavLink
            leftSection={<IconUserShield size="1rem" stroke={1.5} />}
            label="Admins List"
            active={15 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(15);
              window.open("/admins", "_blank", "noopener");
              toggle();
            }}
            color="cyan"
          />
        )}
        {session && (
          <NavLink
            label="Sign Out"
            active={11 === active}
            onClick={(e) => {
              e.preventDefault();
              setActive(11);
              signOut();
              toggle();
            }}
            color="cyan"
          />
        )}
      </AppShell.Navbar>
      <AppShell.Main>
        {active == 8 && <Home />}
        {active == 9 && <RecentlyUploaded />}
        {active == 10 && <MostLiked />}
        {active == 12 && <AddProject />}
        {active == 13 && <ShowAllProjects />}
      </AppShell.Main>
    </AppShell>
  );
}
