import { IconX } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
export default function SuccessState(){
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    return(
      notifications.show({
        title : "Error",
        message : "Failed to create project",
        color:"red",
      })
    )
}