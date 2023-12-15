"use client";
import { Accordion, Button, Grid, Text, rem } from "@mantine/core";
import { error } from "console";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import DotLoader from "../../components/Loader/loader";
export default function Users() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [usersData, setusersData] = useState([
    {
      name: "",
      isAdmin: false,
      email: "",
      isCoordinator: false,
      _id: "",
    },
  ]);
  const fetchdata = useCallback(async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    console.log("fetch data called");
    // console.log(data)
    setusersData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchdata().catch(console.error);
  }, [fetchdata]);

  const items = usersData.map((item) =>
    item.isAdmin ? (
      <Accordion.Item key={item._id || "neer"} value={item?._id || "neer"}>
        <Accordion.Control>{item.name}</Accordion.Control>
        <Accordion.Panel>
          <Grid>
            <Text fw={700} m={"lg"}>
              email :{" "}
            </Text>
            <Text m={"lg"}>{item.email}</Text>
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
    ) : (
      <></>
    )
  );
  if (loading) {
    return <DotLoader />;
  } else {
    return (
      <>
        {session?.user.isAdmin && (
          <div>
            <Accordion
              style={{ verticalAlign: "middle" }}
              m={"lg"}
              variant="separated"
              radius="md"
            >
              {items}
            </Accordion>
          </div>
        )}
      </>
    );
  }
}
