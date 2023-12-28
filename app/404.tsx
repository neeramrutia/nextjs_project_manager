import { Title, Text, Button, Container, Group , rem} from "@mantine/core";
import classes from "../public/Error.module.css";
type params = {
    statuscode:number , 
    title:string ,
    des:string}
export default function ErrorPage(ob:params) {
  return (
    <div className={classes.root}>
      {/* <div>
        <Group justify="space-around">
          <svg
            fill="#fff"
            width="300px"
            height="300px"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.514 13c-.45 0-.688.54-.363.857l3.143 3.14-3.146 3.146c-.455.436.255 1.177.707.707L15 17.705l3.146 3.145c.452.47 1.162-.27.707-.707l-3.146-3.145 3.142-3.14c.324-.318.087-.858-.364-.858-.13.004-.253.058-.344.15L15 16.29l-3.142-3.14c-.09-.092-.214-.146-.344-.15zM2.5 8h25c.277 0 .5.223.5.5s-.223.5-.5.5h-25c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM7 6.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-2 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-2 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zM1.5 4C.678 4 0 4.678 0 5.5v19c0 .822.678 1.5 1.5 1.5h27c.822 0 1.5-.678 1.5-1.5v-19c0-.822-.678-1.5-1.5-1.5h-27zm0 1h27c.286 0 .5.214.5.5v19c0 .286-.214.5-.5.5h-27c-.286 0-.5-.214-.5-.5v-19c0-.286.214-.5.5-.5z" />
          </svg>
        </Group>
        <Group mt={rem(15)} justify="space-around">
          <h1>An error has occurred</h1>
        </Group>
        <Group justify="space-around">
        <p >
      Server is currently under high load - please hit 'reload' on your browser in a minute to try again
    </p>
        </Group>
      </div> */}

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
