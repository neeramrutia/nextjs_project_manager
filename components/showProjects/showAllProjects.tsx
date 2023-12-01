import { useCallback, useEffect, useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Badge, Button, Center, Group, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
interface project{
    title:String,
    content:String,
    status:String,
    userId:String,
    new:Boolean,
    _id:String,
    addedDate:String,
    ProjectType:String,
    ProjectLink:String,
    __v:Number
}
export default function ShowAllProjects() {
  const [mydata , setmyData] = useState([{
    title:'',
    content:'',
    Mentor:'',
    new:false,
    _id:''
  }]);
  const fetchData = useCallback(async () => {
    const data = await fetch('api/projects');
    const res = await data.json();
    setmyData(res);
    console.log(res)
    console.log(mydata);
  }, [])
  useEffect(() => {
    fetchData()
      .catch(console.error);
      setLoading(false);
  }, [fetchData])
  const [query, setQuery] = useState('');
  const [loading , setLoading] = useState(true);
  const data  = mydata
  let counter = 1;
  if(!loading){
    var items = data
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => (
      <Link href={`/project/${item._id}`} style={{ textDecoration: 'none'}}>
      <Spotlight.Action key={counter++} onClick={() => {console.log(item); }}>
      <Group wrap="nowrap" w="100%">
        <div style={{ flex: 1 }}>
          <Text c={"teal"}>{item.title}</Text>

          {item.Mentor && (
            <Text c={'cyan'} opacity={0.6} size="xs">
              Mentor : {item.Mentor}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">new</Badge>}
      </Group>
    </Spotlight.Action>
    </Link>
    ));
  return (
    <>
    
      <TextInput onClick={spotlight.open} w={"30%"} placeholder='search by project name'/>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke={1.5} />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
  }
}
