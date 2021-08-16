import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// a proper place to define a component
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {all === 0 ? 0 : (good - bad) / all}</div>
      <div>positive {all === 0 ? 0 : (good * 100) / all} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, increaser) => () => increaser(value + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClick(good, setGood)}>good</button>
      <button onClick={handleClick(neutral, setNeutral)}>neutral</button>
      <button onClick={handleClick(bad, setBad)}>bad</button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
