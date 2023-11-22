import {
  Button,
  Card,
  Group,
  PasswordInput,
  TextInput,
  Notification,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function SignUpWithCred() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [result, setResult] = useState(0);
  const [registered, setRegistered] = useState(false);
  const registerUser = async (values: Object) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(res.json());
    if (res.status == 201) {
      setResult(1);
    } else {
      setResult(-1);
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div>
      {result == 0 && registered && (
        <Notification w={"28%"} ml={"33%"} mt={"5%"} onClose={()=>{setRegistered(false)}} loading title="Loading">
          Creating User
        </Notification>
      )}
      {result == 1 && registered && (
        <Notification w={"28%"} ml={"33%"} mt={"5%"} onClose={()=>{setRegistered(false)}} icon={checkIcon} color="teal" title="All good!">
          User registered successfully
        </Notification>
      )}
      {result == -1 && registered && (
        <Notification w={"28%"} ml={"33%"} mt={"5%"} onClose={()=>{setRegistered(false)}} icon={xIcon} color="red" title="Bummer!">
          Something went wrong
        </Notification>
      )}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        w="28%"
        mt="10%"
        ml="33%"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            registerUser(values);
            setRegistered(true);
          })}
        >
          <TextInput
            m="sm"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            required
          />
          <TextInput
            m={"sm"}
            withAsterisk
            label="Name"
            placeholder="Your name"
            {...form.getInputProps("name")}
            required
          />
          <PasswordInput
            m={"sm"}
            withAsterisk
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            required
          />

          <Group justify="center" mt="md">
            <Button type="submit" color="teal">
              Register
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
}
