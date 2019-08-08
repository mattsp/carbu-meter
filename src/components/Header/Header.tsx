import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import React from 'react'

interface IProps {
    title: string
}
const Header = ({ title }: IProps) => {
    const { t } = useTranslation()
    return <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                {t(title, { count: 2 })}
            </Typography>
        </Toolbar>
    </AppBar>
}


export default Header;