export const initialState = {
    showRules: false,
    showResults: false,
    userChoice: '',
    computerChoice: '',
    winner: '',
    score: 0
};

const generateComputerChoice = () => {
    const options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    return options[Math.floor(Math.random() * options.length)];
}

const getResult = (userChoice, computerChoice) => {
    switch (true) {
        case userChoice === computerChoice:
            return 'draw';

        case userChoice === 'scissors' && computerChoice === 'paper':
        case userChoice === 'paper' && computerChoice === 'rock':
        case userChoice === 'rock' && computerChoice === 'lizard':
        case userChoice === 'lizard' && computerChoice === 'spock':
        case userChoice === 'spock' && computerChoice === 'scissors':
        case userChoice === 'scissors' && computerChoice === 'lizard':
        case userChoice === 'paper' && computerChoice === 'spock':
        case userChoice === 'rock' && computerChoice === 'scissors':
        case userChoice === 'lizard' && computerChoice === 'paper':
        case userChoice === 'spock' && computerChoice === 'rock':
            return 'user';

        case computerChoice === 'scissors' && userChoice === 'paper':
        case computerChoice === 'paper' && userChoice === 'rock':
        case computerChoice === 'rock' && userChoice === 'lizard':
        case computerChoice === 'lizard' && userChoice === 'spock':
        case computerChoice === 'spock' && userChoice === 'scissors':
        case computerChoice === 'scissors' && userChoice === 'lizard':
        case computerChoice === 'paper' && userChoice === 'spock':
        case computerChoice === 'rock' && userChoice === 'scissors':
        case computerChoice === 'lizard' && userChoice === 'paper':
        case computerChoice === 'spock' && userChoice === 'rock':
            return 'computer';

        default:
            throw new Error('Invalid option.');

    }
}


export const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_RULES':
            return {
                ...state,
                showRules: true
            }

        case 'HIDE_RULES':
            return {
                ...state,
                showRules: false
            }

        case 'TOGGLE_RESULT_DISPLAY':
            return {
                ...state,
                showResults: !state.showResults
            }

        // case 'SET_SAVED_SCORE':
        //     return {
        //         ...state,
        //         score: action.payload.score || state.score
        //     }

        case 'SET_USER_CHOICE':
            return {
                ...state,
                userChoice: action.payload.userChoice
            }

        case 'SET_COMPUTER_CHOICE':
            return {
                ...state,
                computerChoice: generateComputerChoice()
            }

        case 'SET_SCORE':
            const result = getResult(state.userChoice, state.computerChoice);

            return {
                ...state,
                winner: result,
                score: result === 'user' ?
                    state.score++ : result === 'computer' && state.score > 0 ?
                        state.score-- : state.score
            }

        default:
            return state;
    }

}