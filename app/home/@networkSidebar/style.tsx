import { Card, Divider, Grid, Menu, MenuItem, TextField, styled } from "@mui/material";

export const searchStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    height: '25rem',
    backgroundColor: 'rgba(100, 100, 100, 0.7)',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

export const FriendRequestCard = styled(Card)(({theme}) => ({
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

export const FriendRequestGrid = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(-2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const ContactCard = styled(Card)(({theme}) => ({
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

export const ContactGridHeader = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(-2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}))

export const ContactGridContent = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

export const SearchContactTextField = styled(TextField)(() => ({
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent', // Remove the default border
        },
        '&:hover fieldset': {
          borderColor: 'transparent', // Remove the border when hovering
        },
    },
}))

export const ContactModalGridContent = styled(Grid)(({theme}) => ({
    marginTop: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'rgba(51,51,51,0.9)',
    '&:hover': {
        backgroundColor: 'rgba(51,51,51,0.7)'
    },
    borderRadius: '20px'
}))

export const ContactModalGridContentItem = styled(Grid)(({theme}) => ({
    marginBottom: theme.spacing(2)
}))

export const ChatMenu = styled(Menu)(({theme}) => ({
    marginTop: theme.spacing(2),
}))

export const ChatMenuGridHeader = styled(Grid)(({theme}) => ({
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
}))

export const ChatMenuDivider = styled(Divider)(({theme}) => ({
    marginBottom: theme.spacing(2),
}))

export const ChatMenuItem = styled(MenuItem)(({theme}) => ({
    marginTop: theme.spacing(2)
}))

export const ChatMenuItemGrid = styled(Grid)(({theme}) => ({
    marginLeft: theme.spacing(2),
}))