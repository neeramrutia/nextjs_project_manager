
import { Badge, Button, Card, Grid, Group ,Image , Text } from "@mantine/core";
export default function MostLiked(){
    return (
    <Grid>
    <Grid.Col span={4}>
    <Card shadow="sm" padding="lg" radius="md" withBorder className=''  >
    <Card.Section>
      <Image
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        height={160}
        alt="Norway"
      />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={500}>Most Liked</Text>
      <Badge color="pink" variant="light">
        On Sale
      </Badge>
    </Group>

    <Text size="sm" c="dimmed">
      With Fjord Tours you can explore more of the magical fjord landscapes with tours and
      activities on and around the fjords of Norway
    </Text>

    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      Book classic tour now
    </Button>
  </Card>
    </Grid.Col>
    </Grid>
    )
}