import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme=>({

    root: {
        backgroundColor: 'white',
        width: '18%',
        padding: '1.5rem 1rem'
    },
    logoType: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginRight: '1rem',
        color: theme.palette.primary.main
    },
    hashTagTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginTop: '3rem',
        marginBottom: '1.5rem'
    },
    hashtag: {
        marginRight: '.8rem',
    },
    hashTagParent: {
        marginBottom: '.5rem !important',
        padding: '.15rem !important',
        width: '100%'

    }
}));
export default useStyles;