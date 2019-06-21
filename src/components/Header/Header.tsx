import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

interface IProps {
    title: string
}
const Header = ({ title }: IProps) => {
    return <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                {title }
            </Typography>
        </Toolbar>
    </AppBar>
}


export default Header;