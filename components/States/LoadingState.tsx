import { notifications } from '@mantine/notifications';
export default function LoadingState(){
    return(
        notifications.show({
            title : "Loading ",
            message : "Creating project",
            color:"gray",
            loading : true
          })
    )
}