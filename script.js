const selectPlayerType = Math.floor(Math.random()*2);
let playerType;
let computerType;

if (selectPlayerType==0){
    playerType = 'X'; computerType = 'O';
} else {
    playerType = 'O'; computerType = 'X';
}

let buttonsMarkedUser = [] // everything marked by the user
let buttonsMarkedComputer = [] // everything marked by the computer
if (playerType!='X'){
    // computer starts first
    move = Math.floor(Math.random()*9+1)
    buttonsMarkedComputer.push(move)
    const comptbtn = document.querySelector(`.b${move}`)
    comptbtn.innerHTML = computerType
    comptbtn.style.color = 'red'
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click', function onClick(){
        const clickedButton = this.className.split(' ')[1]
        // the code below will run only when the user select a button or a square in the game that isn't marked
        if (!buttonsMarkedUser.includes(+clickedButton) && !buttonsMarkedComputer.includes(+clickedButton)){
            buttonsMarkedUser.push(+clickedButton)
            this.innerHTML = playerType
            this.style.color = 'red'

            console.log(buttonsMarkedUser)
            console.log(buttonsMarkedUser.includes(clickedButton))
    
            checkWin(buttonsMarkedUser, playerType) // check if the user has any winning combinations


            // computer's turn
            // generates a move for the computer
            let move;
            function generateMove(){
                move = Math.floor(Math.random()*9+1)
                // if the square/button is already marked, the function is forced to generate a new move
                if (buttonsMarkedUser.includes(move) || buttonsMarkedComputer.includes(move)){
                    generateMove()
                }
            }

            generateMove()
            

            buttonsMarkedComputer.push(move)
            const comptbtn = document.querySelector(`.b${move}`)
            comptbtn.innerHTML = computerType
            comptbtn.style.color = 'red'
            

            checkWin(buttonsMarkedComputer, computerType)
        }



    })
})



function checkWin(squresMarked, player){
    

    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    
        [1, 5, 9],
        [3, 5, 7],
    
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ]
    
    

    squresMarked.sort()

    
    let a = ''
    function checkEveryCombination(cn){
        for (let i=0; i<winningCombinations[cn].length; i++){
            a+=(squresMarked.includes(winningCombinations[cn][i]))
        }
    }
    
    function checkCombinations(){
        for (let i=0; i<winningCombinations.length; i++){
            checkEveryCombination(i)
            if (a=='truetruetrue'){
                return 'WIN'
            } 
            a = ''
        }
    }
    
    let result = checkCombinations()
    if (result=='WIN'){
        (alert(`Winner - ${player}`))

    } else {
        if (buttonsMarkedComputer.length+buttonsMarkedUser.length==9){
            alert('draw')
        }
    }
    


}