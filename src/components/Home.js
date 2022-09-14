import { useState, useEffect, useContext } from 'react';

import styled, { ThemeContext } from 'styled-components';

import { motion } from 'framer-motion';

import { AppContext } from '../contexts/app';

import RulesModal from './RulesModal';

import logo from '../assets/images/logo-bonus.svg';
import pentagonBg from '../assets/images/bg-pentagon.svg';

import scissorsIcon from '../assets/images/icon-scissors.svg';
import paperIcon from '../assets/images/icon-paper.svg';
import rockIcon from '../assets/images/icon-rock.svg';
import lizardIcon from '../assets/images/icon-lizard.svg';
import spockIcon from '../assets/images/icon-spock.svg';


const hoverAnimation = { scale: 1.125 };

const winnerAnimation = {
    initial: {
        boxShadow: '0'
    },
    animate: {
        boxShadow: [
            '0',
            '0 0 0 calc(20px + 2vw) hsla(0, 0%, 35%, .125)',
            '0 0 0 calc(20px + 2vw) hsla(0, 0%, 35%, .125), 0 0 0 calc(45px + 3.5vw) hsla(0, 0%, 35%, .125)',
            '0 0 0 calc(20px + 2vw) hsla(0, 0%, 35%, .125), 0 0 0 calc(45px + 3.5vw) hsla(0, 0%, 35%, .125), 0 0 0 calc(70px + 5.5vw) hsla(0, 0%, 35%, .125)'
        ]
    }
}

const Page = styled.div`
     background: ${({ theme }) => theme.colors.radialGradient} no-repeat;
     background-size: cover;
     padding: 2em 5%;
     
     display: flex;
     flex-direction: column;
     align-items: center;
     min-height: 100vh;
`;

const Header = styled.header`
    border: 3px solid ${({ theme }) => theme.colors.headerOutline};
    border-radius: .5em;
    max-width: 600px;
    width: 100%;
    padding: 1em;
    /* prevents box-shadow of the user's choice from overlapping the result */
    position: relative;
    z-index: 2;
    
    .header__fig {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2em;
    }
    
    .header__scorecard {
        background: ${({ theme }) => theme.colors.white};
        border-radius: .5em;
        padding: 1em 2em;
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .header__score-title {
        color: ${({ theme }) => theme.colors.scoreText};
        font-size: 1rem;
        font-weight: ${({ theme }) => theme.font.weights.semibold};
        text-transform: uppercase;
    }
    
    .header__score-no {
        color: ${({ theme }) => theme.colors.darkText};
        font-weight: ${({ theme }) => theme.font.weights.bold};
        font-size: 3rem;
    }
    
    @media (min-width: 700px) {
        margin: 1em 0;
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 3.5em 0 2em;
    width: 100%;

    .options {
        transform: scale(var(--scale));

        background: url(${pentagonBg});
        background-size: contain;

        position: relative;
        margin: 4em 0;

        height: calc(313px * var(--scale));
        width: calc(329px * var(--scale));
        aspect-ratio: 329 / 313;
    }
    
    .option__btn,
    .choice__img-c {
        background: ${({ theme }) => theme.colors.white};
        
        height: calc(145px * var(--scale));
        width: calc(145px * var(--scale));
        border-radius: 50%;
        display: block;
        
        background-origin: border-box;
        background-clip: content-box, border-box;
        transform: scale(var(--scale));        
    }

    .choice__img-c {
        /* prevents box-shadow of the user's choice from overlapping the result */
        position: relative;
        z-index: 1;
    }
    
    .option__btn {
        border: 5px double transparent;
        cursor: pointer;
        position: absolute;
    }

    .choice__img-c--computer {
        background: hsla(0, 0%, 100%, .1);
    }

    .option__btn--scissors,
    .choice__img-c--scissors {
        background-image: ${({ theme }) => theme.colors.scissorsGradient};
    }
    
    .option__btn--scissors{
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
    }
    
    .option__btn--paper,
    .choice__img-c--paper {
        background-image: ${({ theme }) => theme.colors.paperGradient};
    }
    
    .option__btn--paper {
        right: 0;
        top: calc(100% / 3);
        transform: translate(50%, -50%);
    }
    
    .option__btn--rock,
    .choice__img-c--rock {
        background-image: ${({ theme }) => theme.colors.rockGradient};
    }
    
    .option__btn--rock {
        bottom: 0;
        left: 100%;
        transform: translate(-100%, 50%);
    }

    .option__btn--lizard,
    .choice__img-c--lizard {
        background-image: ${({ theme }) => theme.colors.lizardGradient};
    }
    
    .option__btn--lizard {
        bottom: 0;
        left: 0;
        transform: translate(0, 50%);
    }
    
    .option__btn--spock,
    .choice__img-c--spock {
        background-image: ${({ theme }) => theme.colors.cyan};
    }
    
    .option__btn--spock {
        left: 0;
        top: calc(100% / 3);
        transform: translate(-50%, -50%);
    }

    .option__img,
    .choice__img {
        box-shadow: inset 0 6px 2px 0 #00000030;
        background: hsl(0, 0%, 90%);
        border-radius: 50%;
        object-fit: scale-down;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        padding: 1em;
        width: calc(100% - 30px);
        aspect-ratio: 1 / 1;
    }

    .choice__img {
        width: calc(100% - (30px + 1vw));
    }
    
    @media (min-width: 700px) {
        margin: 4em 0 0;
    }
`;

const GameOptions = styled(motion.div)`
    --scale: .635;


   @media (min-width: 350px) {
        --scale: .725;
    }
    
    @media (min-width: 425px) {
        --scale: .825;
    }
    
    @media (min-width: 500px) {
        --scale: 1;
    }
`;

const GameChoices = styled(motion.div)`
    --scale: .8;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;
    
    .choice {
        flex: 150px;
        max-width: 45%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(1.25em * var(--scale));
    }
    
    .choice__text {
        color: ${({ theme }) => theme.colors.white};
        font-size: 1.125rem;
        font-weight: ${({ theme }) => theme.font.weights.semibold};
        letter-spacing: 0.05em;
        text-align: center;
        text-transform: uppercase;
    }

    @media (min-width: 300px) {
        --scale: .925;
    }

    @media (min-width: 350px) {
        --scale: 1;
    }

    @media (min-width: 450px) {
        --scale: 1.105;

        gap: calc(1 + 3vw);
    }

    @media (min-width: 750px) {
        --scale: 1.125;

        flex-wrap: nowrap;
        gap: 2em calc(2em + 5vw);

        .choice {
            flex-direction: column-reverse;
            gap: 3em;
            
            flex: auto;
            
            &__text {
                font-size: 1.375rem;
                white-space: nowrap;
            }

            &--user {
                order: 1;
            }
    
            &--computer {
                order: 3;
            }
        }
    }
`;

const Result = styled(motion.div)`
    align-self: center;
    flex-basis: 100%;
    margin: 2em 0;
    white-space: nowrap;
    /* prevents box-shadow of the user's choice from overlapping the result */
    position: relative;
    z-index: 2;
    
    .result__p {
        color: ${({ theme }) => theme.colors.white};
        font-size: 3rem;
        font-weight: ${({ theme }) => theme.font.weights.bold};
        text-align: center;
        text-transform: uppercase;
    }

    @media (min-width: 750px) {
        flex-basis: auto;
        order: 2;

    }
`;

const PlayBtn = styled(motion.button)`
    background: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: .5em;
    color: ${({ theme }) => theme.colors.darkText};
    cursor: pointer;
    display: block;
    font-weight: ${({ theme }) => theme.font.weights.bold};
    font-size: 1rem;
    letter-spacing: .125em;
    margin: 1em auto;
    padding: .8em 3em;
    text-transform: uppercase;

    :hover {
        ${({ $didUserLose }) => $didUserLose && `
            color: hsl(0, 95%, 50%);
        `}
    }
`;

const RulesBtn = styled(motion.button)`
    background: transparent;
    border: 2.5px solid ${({ theme }) => theme.colors.headerOutline};
    border-radius: .5em;
    color: hsl(0, 0%, 82%);
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.font.weights.bold};
    letter-spacing: .075em;
    margin-top: 2em;
    padding: .65em 1.5em;
    text-transform: uppercase;
    

    @media (min-width: 500px) {
        align-self: flex-end;
    }

    @media (min-width: 700px) {
        margin-top: ${({ $showResults }) => $showResults ? '7em' : '.5em'};
    }
`;

const Home = () => {
    const { state: { userChoice, computerChoice, score, winner, showResults }, dispatch } = useContext(AppContext);

    const { colors: { rockGradient, paperGradient, scissorsGradient, lizardGradient, cyan } } = useContext(ThemeContext);


    const [userChoiceImg, setUserChoiceImg] = useState('');
    const [computerChoiceImg, setComputerChoiceImg] = useState('');

    const showRulesModal = () => {
        dispatch({ type: 'SHOW_RULES' });
    }

    const setUserChoice = (userChoice) => {
        return () => {
            dispatch({ type: 'SET_USER_CHOICE', payload: { userChoice } });
            dispatch({ type: 'SET_COMPUTER_CHOICE' });

            dispatch({ type: 'TOGGLE_RESULT_DISPLAY' })
        }
    }

    const getChoiceBg = (computerChoice) => {
        switch (computerChoice) {
            case 'rock':
                return rockGradient;
            case 'paper':
                return paperGradient;
            case 'scissors':
                return scissorsGradient;
            case 'lizard':
                return lizardGradient;
            case 'spock':
                return cyan;
            default:
                throw new Error('Invalid computer choice.')
        }
    }

    const playAgain = () => {
        dispatch({ type: 'TOGGLE_RESULT_DISPLAY' })
    }

    useEffect(() => {
        dispatch({ type: 'SET_SAVED_SCORE', payload: { score: localStorage.getItem('score') ?? 0 } });
    }, [dispatch]);

    useEffect(() => {
        if (userChoice) {
            switch (userChoice) {
                case 'rock':
                    setUserChoiceImg(rockIcon);
                    break;
                case 'paper':
                    setUserChoiceImg(paperIcon);
                    break;
                case 'scissors':
                    setUserChoiceImg(scissorsIcon);
                    break;
                case 'lizard':
                    setUserChoiceImg(lizardIcon);
                    break;
                case 'spock':
                    setUserChoiceImg(spockIcon);
                    break;
                default:
                    throw new Error('Invalid option.');
            }
        }
    }, [userChoice]);

    useEffect(() => {
        if (computerChoice) {
            switch (computerChoice) {
                case 'rock':
                    setComputerChoiceImg(rockIcon);
                    break;
                case 'paper':
                    setComputerChoiceImg(paperIcon);
                    break;
                case 'scissors':
                    setComputerChoiceImg(scissorsIcon);
                    break;
                case 'lizard':
                    setComputerChoiceImg(lizardIcon);
                    break;
                case 'spock':
                    setComputerChoiceImg(spockIcon);
                    break;
                default:
                    throw new Error('Invalid option.');
            }
        }
    }, [computerChoice]);

    // Updates the score after the user plays
    useEffect(() => {
        if (userChoice && computerChoice) {
            dispatch({ type: 'SET_SCORE' })
        }
    }, [dispatch, userChoice, computerChoice]);

    
    // Stores the updated score in localStorage to preserve the value after the browser is refreshed
    useEffect(() => {
        if (userChoice && computerChoice) {
            localStorage.setItem('score', score);
        }
    }, [score, userChoice, computerChoice]);


    return (
        <Page>
            <Header>
                <figure className='header__fig'>
                    <img src={logo} alt="Logo" />
                    <figcaption className='header__scorecard'>
                        <h2 className='header__score-title'>Score</h2>
                        <motion.span key={score} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className='header__score-no'>{score}</motion.span>
                    </figcaption>
                </figure>
            </Header>
            <Main>
                {
                    !showResults ?
                        <GameOptions initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', duration: 1 }} className='options'>
                            <button onClick={setUserChoice('scissors')} className='option__btn option__btn--scissors'>
                                <img className='option__img' src={scissorsIcon} alt="Scissors icon" />
                            </button>
                            <button onClick={setUserChoice('paper')} className='option__btn option__btn--paper'>
                                <img className='option__img' src={paperIcon} alt="Paper icon" />
                            </button>
                            <button onClick={setUserChoice('rock')} className='option__btn option__btn--rock'>
                                <img className='option__img' src={rockIcon} alt="Rock icon" />
                            </button>
                            <button onClick={setUserChoice('lizard')} className='option__btn option__btn--lizard'>
                                <img className='option__img' src={lizardIcon} alt="Lizard icon" />
                            </button>
                            <button onClick={setUserChoice('spock')} className='option__btn option__btn--spock'>
                                <img className='option__img' src={spockIcon} alt="Spock icon" />
                            </button>
                        </GameOptions>
                        :
                        <>
                            <GameChoices
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='choices'>
                                <motion.figure whileHover={hoverAnimation} className='choice choice--user'>
                                    <motion.div
                                        variants={winnerAnimation}
                                        initial='initial'
                                        animate={winner === 'user' ? 'animate' : 'initial'}
                                        transition={{
                                            duration: 1,
                                            delay: 1,
                                            times: [0, 0.6, 0.8, 1]
                                        }}
                                        className={`choice__img-c choice__img-c--user choice__img-c--${userChoice}`}>
                                        <img className='choice__img' src={userChoiceImg} alt={`${userChoice} icon`} />
                                    </motion.div>
                                    <figcaption className='choice__text'>You Picked</figcaption>
                                </motion.figure>
                                <motion.figure whileHover={hoverAnimation} className='choice choice--computer'>
                                    <motion.div
                                        variants={winnerAnimation}
                                        initial={['initial',
                                            { backgroundImage: 'linear-gradient(hsla(240, 80%, 5%, .1), hsla(240, 80%, 5%, .1))' }]}
                                        animate={[winner === 'computer' ? 'animate' : 'initial',
                                        { backgroundImage: getChoiceBg(computerChoice) }]}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1.5,
                                        }}
                                        className={`choice__img-c choice__img-c--computer choice__img-c--${computerChoice}`}>
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 1.5,
                                                times: [0, 0.6, 0.8, 1]
                                            }}
                                            className='choice__img' src={computerChoiceImg} alt={`${computerChoice} icon`} />
                                    </motion.div>
                                    <figcaption className='choice__text'>The House Picked</figcaption>
                                </motion.figure>
                                <Result
                                    layout
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: '100%' }}
                                    transition={{ delay: 1, duration: 2 }}>
                                    <p className='result__p'>{winner === 'user' ? 'You Win' : winner === 'computer' ? 'You Lose' : 'Draw'}</p>
                                    <PlayBtn
                                        whileHover={hoverAnimation}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={playAgain}
                                        $didUserLose={winner === 'computer'}>Play Again</PlayBtn>
                                </Result>
                            </GameChoices>
                        </>
                }
                <RulesBtn
                    whileHover={hoverAnimation}
                    whileTap={{ scale: 0.95 }}
                    $showResults={showResults}
                    onClick={showRulesModal}>Rules</RulesBtn>
                <aside>
                    <RulesModal />
                </aside>
            </Main>
        </Page >
    )
}

export default Home