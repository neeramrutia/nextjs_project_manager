"use client";
import { Accordion, Button, Grid, Group, Text, rem } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { promoteToAdmin , promoteToCoordinator , removeUser } from "./helper";
import DotLoader from "../../components/Loader/loader";
import { useIntersection, useNetwork } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FooterLinks } from "../../components/footer/footer";
let skip = 0;
let limit = 15;
let count = 0;
let USERS = [{
  isAdmin:false,
  isCoordinator:false,
  _id:"",
  name:"",
  email:""
}]
let initialDataLoad = true;
const fetcher = async(skip:Number , limit:Number)=>{
    const Count = await fetch(`/api/count?role=user`);
    const countData =await Count.json();
    count=countData.count
    // console.log(count)
    const res = await fetch(`/api/users?skip=${skip}&limit=${limit}&role=user`);
    const data = await res.json();
    // console.log(data)
    if(USERS.length == 1)
    {
      USERS = [...data]
    }
    else{
      USERS = [...USERS , ...data]
    }
    initialDataLoad = false;
}

fetcher(skip,limit)
export default function Users() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  useEffect(()=>{
    // console.log("skip : " ,skip);
    // console.log("count : " ,count);
    if((entry?.isIntersecting && count>skip)||(entry?.isIntersecting && count==0) )
    fetcher(skip+limit , limit).then(()=>{skip=skip+limit}).then(()=>{setusersData(USERS)})
    setLoading(false);
  },[entry , initialDataLoad])
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
  
 

  const [usersData, setusersData] = useState([
    {
      name: "",
      isAdmin: false,
      email: "",
      isCoordinator: false,
      _id: "",
    },
  ]);
  
  const updateUser = (_id:string)=>{
    USERS = USERS.filter((u)=>{
        return u._id!=_id
    })
    fetchdata()
  }
  const fetchdata = useCallback(async () => {
    setusersData(USERS)
    
  }, []);

  useEffect(() => {
    // console.log("useEffect called")
    fetchdata().catch(console.error);
  }, []);

  const items = usersData.map((item , i) =>
    !item.isAdmin && !item.isCoordinator ? (
      <Accordion.Item ref={i===usersData.length-1 ? ref:null} key={item._id || "neer"} value={item?._id || "neer"}>
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
                  updateUser(item._id)
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
                  updateUser(item._id)
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
                  updateUser(item._id)
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
          {/* <Button onClick={()=>{fetcher(skip+limit , limit).then(()=>{skip=skip+limit}).then(()=>{setusersData(USERS)})}}></Button> */}
          {
            (entry?.isIntersecting && count>skip) && (
              <DotLoader/>
            )
          }
          {
            (skip == count) && (
              <DotLoader/>
            )
          }
          <Group justify="center">
          {
            
            (skip>count) && (
              <Text>No more data to load</Text>
            )
            

          }
          </Group>
        </div>
        
        <FooterLinks/>
      </>
    );
  }
}
