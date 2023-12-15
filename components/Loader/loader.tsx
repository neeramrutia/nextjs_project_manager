import { Grid , Loader} from "@mantine/core";

export default function DotLoader(){
    return(
        <>
          <Grid justify="center">
            <Grid.Col span="auto"></Grid.Col>
            <Grid.Col span="content">
            <Loader color="teal" size="xl" type="dots" />
            </Grid.Col>
            <Grid.Col span="auto"></Grid.Col>
          </Grid>
        </>
      );
}