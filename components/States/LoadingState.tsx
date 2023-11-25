import { Notification } from '@mantine/core';
export default function LoadingState(){
    return(
        <Notification loading title="Please Wait">
            Creating Project
        </Notification>
    )
}