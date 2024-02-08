"use client";
import { Accordion, Button, Grid, Text, rem, Notification } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { promoteToAdmin , promoteToCoordinator , removeUser } from "./helper";
import DotLoader from "../../components/Loader/loader";
import { useNetwork, useSetState } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
export default function Users() {
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
  const [loading, setLoading] = useState(true);
 
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
     console.log("useCallback called")
    setusersData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("useEffect called")
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
            <Button
              color="teal"
              m={"lg"}
              onClick={() => {
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
  if (loading) {
    return <DotLoader />;
  } else {
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
}
