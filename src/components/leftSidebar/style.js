import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme=>({
    root: {
        backgroundColor: 'white',
        width: '25%',
        padding: '1.5rem 2rem',
    },
    profText: {
        marginLeft: '.5rem',
        width: 'max-content',
        direction:'ltr'
    },
    profName: {
        flex: 1,
    },
    profId: {
        flex: 1,
        color: theme.palette.text.hint,
        fontSize: '.78rem'

    },
    twitterNameParent: {
        marginRight: '.5rem',
        width: 'max-content',
        direction:'ltr'
    },
    twitterRoot: {
        background: '#f5f8fa',
        marginTop: '3rem' ,
        borderRadius: '2.5rem',
    },
    twitterTitle: {
        fontSize: '1.1rem !important',
        fontWeight: '600 !important',
        marginBottom: '11px',
        padding:'11px 24px'
    },
    twitterParent: {
        padding: '10px 24px',
    },
    twitterImg: {
        width: 50,
        height: 50,
        borderRadios: "50%"
    }
}));
export default useStyles;