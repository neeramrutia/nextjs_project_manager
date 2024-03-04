import {
  AppShell,
  Avatar,
  Burger,
  Button,
  Group,
  Menu,
  Modal,
  NavLink,
  Text,
  UnstyledButton,
  em,
  rem,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useNetwork } from "@mantine/hooks";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconChevronRight,
  IconTrash,
  IconBell,
  IconFileAnalytics,
  IconReportAnalytics,
  IconAnalyze
} from "@tabler/icons-react";
import cx from "clsx";
import classes from "../public/Demo.module.css";
import {
  IconFileLike,
  IconHistory,
  IconHome,
  IconPlaylistAdd,
  IconUser,
  IconUserShield,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { forwardRef, useState } from "react";
import Home from "./homeComponent";
import RecentlyUploaded from "./recentlyUploaded";
import MostLiked from "./mostLiked";
import AddProject from "./addingProject/addProject";
import Image from "next/image";
import { notifications } from "@mantine/notifications";
export default function SignedInNavbar() {
  const [deleteButton, setDeleteButton] = useState(true);
  const deleteAccount = async () => {
    const res = await fetch(`/api/users/${session?.user.id}`, {
      method: "DELETE",
    });
    res.status === 201 ? signOut() : console.log("error in sign out");
  };
  const { setColorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const isTab = useMediaQuery(`(max-width: ${em(770)})`);
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [opens, { open, close }] = useDisclosure(false);
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(8);
  const { data: session } = useSession();
  // console.log(session);
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
  interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image?: string | null;
    name?: string;
    email?: string;
    icon?: React.ReactNode;
  }
  // eslint-disable-next-line react/display-name
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
                  <Menu.Dropdown>
                    {(session?.user.isAdmin || session?.user.isCoordinator) && (
                      <>
                        <Menu.Label>Application</Menu.Label>
                        <Menu.Item
                          leftSection={
                            <IconBell
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Notifications
                        </Menu.Item>
                        <Menu.Item
                          onClick={()=>{window.open("/analysis")}}
                          leftSection={
                            <IconReportAnalytics
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Analysis
                        </Menu.Item>
                        <Menu.Divider />
                      </>
                    )}

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      onClick={open}
                      color="red"
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Delete my account
                    </Menu.Item>
                  </Menu.Dropdown>
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
            window.open("/showProjects")
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
              window.open("/users");
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
              window.open("/coordinators");
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
              window.open("/admins");
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
              signOut({callbackUrl : "/"});
              toggle();
            }}
            color="cyan"
          />
        )}
      </AppShell.Navbar>
      <AppShell.Main>
        {active == 8 && <Home />}
        {active == 15 && <Home />}
        {active == 14 && <Home />}
        {active == 16 && <Home />}
        {active == 13 && <Home />}
        {active == 9 && <RecentlyUploaded />}
        {active == 10 && <MostLiked />}
        {active == 12 && <AddProject />}
        <Modal
          opened={opens}
          onClose={close}
          title="Delete Acoount!!"
          transitionProps={{
            transition: "fade",
            duration: 300,
            timingFunction: "linear",
          }}
          centered
        >
          
          <Text  m={"lg"} >
          <div style={{userSelect:"none"}}>
            To confirm, type {session?.user.name}-{session?.user.email} in the
            box below
            </div>
          </Text>
          
          <TextInput
            m={"lg"}
            placeholder="Input placeholder"
            onChange={(e) => {
              if (
                e.target.value ===
                session?.user.name + "-" + session?.user.email
              ) {
                setDeleteButton(false);
              }else{
                setDeleteButton(true)
              }
            }}
          />
          <Group justify="center">
            <Button variant="outline" color="red" disabled={deleteButton} onClick={deleteAccount}>
              I want to delete this account
            </Button>
          </Group>
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
