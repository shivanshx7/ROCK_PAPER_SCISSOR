import { useState } from 'react'
import './App.css'

function App() {
  const [compScore, setCompScore] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [userMove, setUserMove] = useState('')
  const [compMove, setCompMove] = useState('')
  const [result, setResult] = useState('')
  const [rounds, setRounds] = useState(0)
  const [history, setHistory] = useState([])
  const [streak, setStreak] = useState(0)

  function getComputerMove() {
    const k = Math.random()
    if (k > 0.66) return 'rock'
    if (k > 0.33) return 'paper'
    return 'scissor'
  }

  function decideWinner(user, comp) {
    if (user === comp) return 'Draw'

    if (
      (user === 'rock' && comp === 'scissor') ||
      (user === 'paper' && comp === 'rock') ||
      (user === 'scissor' && comp === 'paper')
    ) {
      return 'User'
    }

    return 'Computer'
  }

  function turnMover(input) {
    const user = input
    const comp = getComputerMove()

    setUserMove(user)
    setCompMove(comp)

    const winner = decideWinner(user, comp)

    setRounds(prev => prev + 1)

 
    if (winner === 'User') {
      setUserScore(prev => prev + 1)
      setStreak(prev => prev + 1)
      setResult('You Win 🎉')
    } else if (winner === 'Computer') {
      setCompScore(prev => prev + 1)
      setStreak(0)
      setResult('Computer Wins 🤖')
    } else {
      setStreak(0)
      setResult('Draw 😐')
    }


    const roundData = {
      user,
      comp,
      winner
    }

    setHistory(prev => [roundData, ...prev])
  }

  function resetGame() {
    setCompScore(0)
    setUserScore(0)
    setUserMove('')
    setCompMove('')
    setResult('')
    setRounds(0)
    setHistory([])
    setStreak(0)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Rock Paper Scissors</h1>

      <h3>Rounds Played: {rounds}</h3>
      <h3>🔥 Win Streak: {streak}</h3>

      <div>
        <button onClick={() => turnMover('rock')}>🪨</button>
        <button onClick={() => turnMover('paper')}>📄</button>
        <button onClick={() => turnMover('scissor')}>✂️</button>
      </div>

      <h3>
        You: {userMove} | Computer: {compMove}
      </h3>

      <h2>{result}</h2>

      <h2>
        Computer: {compScore} || User: {userScore}
      </h2>

      <button 
        onClick={resetGame} 
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        🔄 Reset Game
      </button>


      <div style={{ marginTop: '30px' }}>
        <h2>📜 Move History</h2>

        {history.length === 0 ? (
          <p>No rounds played yet</p>
        ) : (
          history.map((round, index) => (
            <div key={index}>
              #{rounds - index} → You: {round.user} | Comp: {round.comp} | Winner: {round.winner}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
