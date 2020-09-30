import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = (props) => {

  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='Good' value={props.good}/>
          <StatisticLine text='Neutral' value={props.neutral}/>
          <StatisticLine text='Bad' value={props.bad}/>
          <StatisticLine text='All' value={props.all}/>
          <StatisticLine text='Average' value={(props.good + props.neutral * 0 + props.bad * -1) / props.all}/>
          <StatisticLine text='Positive' value={props.good / props.all * 100 + ' %'}/>
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = (props) => {
  return (
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
    
  )

}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad +1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral +1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )






}

ReactDOM.render(<App />, document.getElementById('root'))