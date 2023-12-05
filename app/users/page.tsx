"use client";
import { Accordion, Button, Grid, Text, rem } from "@mantine/core";
import { error } from "console";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

export default function Users() {
  const removeUser = async (_id: String) => {
    const res = await fetch(`/api/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    if (res.status == 201) console.log("user is deleted");
    else console.log("user not deleted");
  };
  const promoteToAdmin = async (userId: String) => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: true }),
    });
  }
  const promoteToCoordinator = async (userId: String) => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCoordinator: true }),
    });

    if (res.status == 200) console.log("user is promoted to co-ordinator");
    else console.log("user not promoted to co-ordinator");
  };

  const fetcher = async (url: String) => {};

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
  }, []);

  useEffect(() => {
    fetchdata().catch(console.error);
  }, [fetchdata]);

  const items = usersData.map((item) =>
    !item.isAdmin && !item.isCoordinator ? (
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
        <Accordion.Panel>
          <Grid justify="space-around" mih={rem(80)}>
            <Button
              color="red"
              m={"lg"}
              onClick={() => {
                removeUser(item._id).then(() => {
                  fetchdata();
                });
              }}
            >
              {" "}
              Remove user{" "}
            </Button>
            <Button
              color="teal"
              m={"lg"}
              onClick={() => {
                promoteToCoordinator(item._id).then(() => {
                  fetchdata();
                });
              }}
            >
              {" "}
              Promote to co-ordinator{" "}
            </Button>
            <Button color="teal" m={"lg"}
            onClick={()=> {
              promoteToAdmin(item._id).then(() => {
                fetchdata();
              });
            }}
            >
              {" "}
              Promote to admin{" "}
            </Button>
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
    ) : (
      <></>
    )
  );
  return (
    <>
      {/* {JSON.stringify(usersData)} */}
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
    </>
  );
}
