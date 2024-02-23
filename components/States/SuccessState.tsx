import { IconCheck } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
export default function SuccessState(){
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    return(
      notifications.show({
        title : "Woohoo",
        message : "Project cerated",
        color:"green",
      })
    )
}