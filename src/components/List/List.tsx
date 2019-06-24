import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ComponentClass } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Row from './Row/Row';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            height: 400,
            maxWidth: 360,
            width: '100%',
        },
    }),
);

interface IProps {
    rowRenderer: (props: ListChildComponentProps) => JSX.Element
}

const defaultProps: IProps = {
    rowRenderer: (props: ListChildComponentProps) => <Row {...props}/>
}
const  VirtualizedList = (props: IProps)=> {
    const classes = useStyles();
    const propsPrivate: IProps = { ...defaultProps, ...props }
    return (
        <div className={classes.root}>
            <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
                {propsPrivate.rowRenderer}
            </FixedSizeList>
        </div>
    );
}

VirtualizedList.defaultProps = defaultProps

export default VirtualizedList