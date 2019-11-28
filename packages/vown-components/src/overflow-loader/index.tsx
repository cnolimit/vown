import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as React from 'react'

const useClasses = makeStyles({
  container: {
    zIndex: 5,
    width: '100%',
    height: '100%',
    display: 'grid',
    position: 'absolute',
    alignContent: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  blur: {
    filter: 'blur(2px)',
  },
  top: {
    color: 'rgb(95,37,159, 0.3)',
  },
  bottom: {
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
})

interface IOverflowLoader {
  loading: boolean
  children: React.ReactNode
}

const OverflowLoader = ({ loading, children, ...restProps }: IOverflowLoader) => {
  const classes = useClasses()
  return (
    <React.Fragment>
      {loading ? (
        <div className={classes.container}>
          <div style={{ position: 'relative' }}>
            <CircularProgress
              color="primary"
              data-testid="loader-component"
              variant="determinate"
              className={classes.top}
              value={100}
              size={60}
              thickness={4.5}
              {...restProps}
            />
            <CircularProgress
              color="primary"
              variant="indeterminate"
              disableShrink
              value={80}
              className={classes.bottom}
              size={60}
              thickness={4.5}
              {...restProps}
            />
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className={classes.blur} data-testid="blur-component">
          {children}
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  )
}

export default OverflowLoader
