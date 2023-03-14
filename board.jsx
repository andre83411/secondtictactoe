const Square = ({id, newState}) => {
    const [status, setStatus] = React.useState(null);
    const xo = ["O", "X"];
    return (
        <button onClick= {()=>{
            let nextPlayer = newState(id);
            setStatus(nextPlayer);  
        }}>
          <h1>{xo[status]}</h1>
        </button>
    );
};

const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));
  
    // Function to update the state and switch players
    const newState = (idOfSquare) => {
      if (state[idOfSquare] !== null) {
        // Square already clicked
        return;
      }
  
      // Update square state
      state[idOfSquare] = player;
      setState(state);
  
      // Check for a winner
      const winner = checkWinner(state);
      if (winner !== null) {
        setPlayer(null); // Stop the game
        return player;
      }
  
      // Switch players
      const nextplayer = (player + 1) % 2;
      setPlayer(nextplayer);
  
      return player;
    };
  
    // Determine the game status message
    let status;
    const winner = checkWinner(state);
    if (winner !== null) {
      status = `Player ${winner} wins!`;
    } else if (player !== null) {
      status = `Player ${player}'s turn`;
    } else {
      status = "Game over!";
    }
  
    // Render the squares
    const renderSquare = (i) => {
      return <Square id={i} newState={newState} />;
    };
  
    // Render the board
    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
          <h1>{status}</h1>
        </div>
      </div>
    );
  };
  
    

function checkWinner(state) {
    const win = [
      //horizontal winner
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //vertical winner
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonal winner
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };


// ===========================================================

ReactDOM.render(<Board/>, document.getElementById("root"));


