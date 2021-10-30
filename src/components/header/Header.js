import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './style';

const Header = ({title,icon}) => {
    const classes= useStyles();
    return (
        <div className={classes.header}>
            {icon}
            <Typography className={classes.headerTitle}>
                {title}
            </Typography>
        </div>
    );
};

export default Header;