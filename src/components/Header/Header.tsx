import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    title: {
        textTransform: 'capitalize',
    },
  })

interface IProps {
    title: string
}
const Header = ({ title }: IProps) => {
    const { t } = useTranslation()
    const classes = useStyles();
    return <AppBar position="sticky">
        <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit">
                {t(title, { count: 2})}
            </Typography>
        </Toolbar>
    </AppBar>
}


export default Header;