import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import { withStyles } from '@material-ui/styles'
import React, { Component, ErrorInfo } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
interface IState {
    hasError: boolean
}

const styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '6em'
    }
}
interface IProps  extends RouteComponentProps {
    classes: any
}
class ErrorBoundary extends Component<IProps, IState> {

    public static getDerivedStateFromError() {
        return { hasError: true };
    }

    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    public closeHandler = () => {
        this.setState({ hasError: false })
    }

    public goToHomeClickHandler = () => {
        this.props.history.push('/')
    }

    // public componentDidCatch(error: Error, info: ErrorInfo) {
    // }

    public render() {
        const { classes } = this.props;
        if (this.state.hasError) {
            return <Container fixed>
                <Typography component="div" className={classes.root}>
                    <SentimentVeryDissatisfiedIcon className={classes.icon} color="disabled"/>
                    <Typography align="center" variant="h4">Oops!! something went wrong</Typography>
                    <Button onClick={this.goToHomeClickHandler} variant="contained" color="primary">Go to the home</Button>
                </Typography>
            </Container>
        }
        return this.props.children
    }
}

export default  withRouter(withStyles(styles as any)(ErrorBoundary))