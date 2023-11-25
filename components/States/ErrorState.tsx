import { IconX } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
export default function SuccessState(){
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    return(
        <Notification icon={xIcon} color="red" title="Bummer!">
        Something went wrong
      </Notification>
    )
}