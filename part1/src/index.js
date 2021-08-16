import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (buttonType) => () => {
    if (buttonType === 'good') {
      setGood(good + 1)
      setAll(all + 1)
    }
    if (buttonType === 'neutral') {
      setNeutral(neutral + 1)
      setAll(all + 1)
    }
    if (buttonType === 'bad') {
      setBad(bad + 1)
      setAll(all + 1)
    }
  }

  // the average score (good: 1, neutral: 0, bad: -1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClick('good')}>good</button>
      <button onClick={handleClick('neutral')}>neutral</button>
      <button onClick={handleClick('bad')}>bad</button>

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {all === 0 ? 0 : (good - bad) / all}</div>
      <div>positive {all === 0 ? 0 : (good * 100) / all} %</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
