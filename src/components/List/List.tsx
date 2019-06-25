import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import Measure, { BoundingRect } from 'react-measure'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Row, { IProps as IPropsRow } from './Row/Row'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      width: '100%',
    },
  })
)

interface IProps {
  rowRenderer: (props: IPropsRow) => JSX.Element
  itemCount: number
  itemSize: number
  height: number
  width: number
}

const defaultProps: any = {
  rowRenderer: (props: IPropsRow) => (
    <Row {...props} loading={itemStatusMap[props.index] === LOADING} />
  ),
}

const LOADING = 1
const LOADED = 2
const itemStatusMap: { [index: number]: number } = {}

const isItemLoaded = (index: number) => !!itemStatusMap[index]
const loadMoreItems = (startIndex: number, stopIndex: number) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED
      }
      resolve()
    }, 2500)
  )
}
const VirtualizedList = (props: IProps) => {
  const classes = useStyles()
  const propsPrivate: IProps = { ...defaultProps, ...props }
  const [dimensions, setDimensions] = useState<BoundingRect | undefined>(
    undefined
  )
  return (
    <Measure
      bounds
      onResize={contentRect => {
        setDimensions(contentRect.bounds)
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className={classes.root}>
          <div className={classes.list}>
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={props.itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({
                onItemsRendered,
                ref,
              }: {
                onItemsRendered: any
                ref: any
              }) => (
                <FixedSizeList
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={dimensions ? dimensions.height : -1}
                  width={dimensions ? dimensions.width : -1}
                  itemSize={props.itemSize}
                  itemCount={props.itemCount}
                >
                  {propsPrivate.rowRenderer}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </div>
        </div>
      )}
    </Measure>
  )
}

VirtualizedList.defaultProps = defaultProps

export default VirtualizedList
