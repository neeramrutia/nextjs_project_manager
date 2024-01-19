import { Title, Text, Button, Container, Group , rem} from "@mantine/core";
import classes from "../public/Error.module.css";
type params = {
    statuscode:number , 
    title:string ,
    des:string}
export default function ErrorPage(ob:params) {
  return (
    <div className={classes.root}>

      <Container>
        <div className={classes.label}>{ob.statuscode}</div>
        <Title className={classes.title}>{ob.title}</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {ob.des}
        </Text>
        <Group justify="center">
          <Button color="teal" onClick={()=>{location.replace("/")}}>
            Back to home
          </Button>
        </Group>
      </Container>
    </div>
  );
}



// onClick={()=>{window.open('/')}}
