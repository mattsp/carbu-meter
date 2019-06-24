import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ComponentClass } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
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
}

const defaultProps: IProps = {
    rowRenderer: (props: IPropsRow) => <Row {...props} />
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
                itemCount={1000}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }: {onItemsRendered: any, ref: any}) => (
                    <FixedSizeList onItemsRendered={onItemsRendered} ref={ref} height={400} width={360} itemSize={46} itemCount={200}>
                        {propsPrivate.rowRenderer}
                    </FixedSizeList>
                )}
            </InfiniteLoader>
        </div>
    );
}

VirtualizedList.defaultProps = defaultProps

export default VirtualizedList