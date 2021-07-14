import React, { useState } from 'react'

const votes = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0)


const Button = (props) => {
  const {handleClick, text} = props

  return (
    <button onClick={handleClick}> 
      {text}
    </button>
  )
}


 
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  

  const randomNumber = () => {
    setSelected(Math.floor(Math.random() * 6))   
  }

  const voteAnecdote = () => {    
    votes[selected] += 1  
    const copy = [...votes]
    //console.log(votes)
    setVotes(copy)
  }

  const [vote, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)

  const indexOfMax = (arr) => {
    console.log(arr)
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxInd = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxInd = i;
            max = arr[i];
        }
    }
    return maxInd
  } 


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
       has {vote[selected]} votes
      </p>
      <p>
      <Button handleClick={randomNumber} text='next anecdote' />
      <Button handleClick={voteAnecdote} text='vote'/>
      </p>
      <h2>Anecdote with the most votes</h2>
      <p>
        {anecdotes[indexOfMax(votes)]}
      </p>
      <p>
        has {vote[indexOfMax(votes)]} votes
      </p>
    </div>
  )
}

export default App