import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles( theme => ({
    root: {
        background: '#e6e6e6',
    },
    header: {
        padding: 18,
        backgroundColor: 'white',
        display:'flex',
    },
    headerTitle: {
      fontSize: '1.2rem',
      fontWeight: 600,
        marginRight: '.5rem'
    },
    divider: {
        backgroundColor: '#7EBAFF',
        filter: 'opacity(.18)',
    },
    newTwit: {
        padding: 18,
        backgroundColor: 'white',
        display:'flex',
        flexDirection: 'column'
    },
    input: {
        marginRight: '1rem',
        flex: 1,
        border: 'none',
        "&:focus": {
            outline: 'unset'
        },
    },
    newTwitBtn: {
        color: 'white',
        borderRadius: '1rem',
        minHeight: '30px',
        height: '30px',
        fontFamily: 'shabnam !important',
        lineHeight: '1rem',
        minWidth: '5rem'
    },
    newTwitImgBtn: {
        borderRadius: '50%',
        padding: '.2rem',
        border: '.5px solid #3337',
        marginLeft: '1rem'

    },
    twitItem: {
        padding: 18,
        backgroundColor: 'white',
        display:'flex',
        flexDirection: 'column',
        marginTop: '.5rem'
    },
    twitItemName: {
        fontWeight: 600,
        marginRight: '1rem'
    },
    twitItemId: {
        fontSize: '.9rem',
        color: theme.palette.text.hint,
        marginRight: '.5rem',
        paddingTop: '.1rem'
    },
    twitText: {
        fontSize: '.9rem',
        marginTop: '.75rem',
        maxWidth:"50ch",
        overflowWrap: 'break-word'

    },
    likeCount: {
        fontSize: '.8rem',
        color:theme.palette.text.hint,
        marginLeft: '.5rem'
    },
    twitImg: {
        width: '10rem',
        height: '10rem',
        marginTop: '1rem',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }

}));
export default useStyles;