import React from 'react'
import * as ReactDOM from 'react-dom'
import ReviewContainer from '@components/reviews/reviews.container'

const App = () => {
  return <ReviewContainer />
}

ReactDOM.render(<App />, document.getElementById('app'))
