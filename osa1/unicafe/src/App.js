import React, { useState } from 'react'



const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Result = (props) => {
  const {text, result} = props
  return (
    <p>
      {text} {result}
    </p>
  )
}

const Statistics = (props) => {
  const {resultGood, resultBad, resultNeutral, resultAll,
     resultPercentage, resultAvg} = props
  if (resultGood + resultNeutral + resultBad === 0) {
    return (
      <div>
        <p>
        No feedback has been given
        </p>
      </div>
    )
  }

  return (
    <div>
      <Result text='good' result={resultGood} />
      <Result text='neutral' result={resultNeutral}/>
      <Result text='bad' result={resultBad} />
      <Result text='all' result={resultAll}/>
      <Result text='average' result={resultAvg} />
      <Result text='percentage' result={resultPercentage}/>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  //  console.log(setGood)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const allVotes = good + bad + neutral
  const avg = ((good * 1) + (bad * -1)  +  (neutral * 0)) / allVotes
  const percentage = good / allVotes

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h2>Statistics</h2>
      <Statistics resultGood={good} resultBad={bad} resultNeutral={neutral}
        resultAll={allVotes} resultAvg={avg} resultPercentage={percentage} />
    </div>

  )
}

export default App