const Square = ({id, newState}) => {
    const [status, setStatus] = React.useState(null);
    const xo = ["O", "X", " "];
    return (
        <button onClick= {(e)=>{
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
    //set state here
    
    let status = `Player ${player}`;
    let winner = checkWinner(state);
    if (winner != null) status = `Player ${winner} wins`;
     
    //function to keep track of total state
    const newState = idOfSquare=> {
       state[idOfSquare] = player; //player is present player
       let thePlayer = player;
       setState(state); // state is array of 0 or 1 or null
       let nextplayer =(player + 1) % 2;

       if(winner == null) {
       setPlayer(nextplayer);
       } else { setPlayer(xo[2])} //stops game

       return thePlayer;
    }

    function renderSquare(i) {
        return <Square id={i} newState={newState}></Square>;
    }

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
        if(state[a] == state[b] && state[a] == state[c] && state[a])
        return state[a];

    };
    return null;
}
// ===========================================================

ReactDOM.render(<Board/>, document.getElementById("root"));