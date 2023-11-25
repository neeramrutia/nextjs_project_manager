import { IconCheck } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
export default function SuccessState(){
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    return(
        <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
        Everything is fine
      </Notification>
    )
}