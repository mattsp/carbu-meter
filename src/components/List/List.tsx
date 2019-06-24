import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import Row, { IProps as IPropsRow } from './Row/Row';

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
    rowRenderer: (props: IPropsRow) => JSX.Element
    itemCount: number
    itemSize: number
    height: number
    width: number
}

const defaultProps: any = {
    rowRenderer: (props: IPropsRow) => <Row {...props} loading={itemStatusMap[props.index] === LOADING} />,
}

const LOADING = 1;
const LOADED = 2;
const itemStatusMap: { [index: number]: number } = {};

const isItemLoaded = (index: number) => !!itemStatusMap[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADING;
    }
    return new Promise(resolve =>
        setTimeout(() => {
            for (let index = startIndex; index <= stopIndex; index++) {
                itemStatusMap[index] = LOADED;
            }
            resolve();
        }, 2500)
    );
};
const VirtualizedList = (props: IProps) => {
    const classes = useStyles();
    const propsPrivate: IProps = { ...defaultProps, ...props }
    return (
        <div className={classes.root}>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={props.itemCount}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }: { onItemsRendered: any, ref: any }) => (
                    <FixedSizeList
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        height={props.height}
                        width={props.width}
                        itemSize={props.itemSize}
                        itemCount={props.itemCount}>
                        {propsPrivate.rowRenderer}
                    </FixedSizeList>
                )}
            </InfiniteLoader>
        </div>
    );
}

VirtualizedList.defaultProps = defaultProps

export default VirtualizedList