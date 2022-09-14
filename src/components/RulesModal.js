import { useEffect, useContext, useRef } from 'react';

import styled from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';

import { AppContext } from '../contexts/app';

import closeIcon from '../assets/images/icon-close.svg';
import rulesImg from '../assets/images/image-rules-bonus.svg';

const Dialog = styled(motion.dialog)`
    background: ${({ theme }) => theme.colors.white};
    border: none;
    overflow: hidden;
    position: fixed;

    min-width: 100vw;
    min-height: 100vh;
    padding: 1.5em;

    display: ${({ $showRules }) => $showRules ? 'grid' : 'none'};
    place-items: center;

    .dialog__content--desktop {
        display: none;
    }
    
    .dialog__content {
        height: 80vh;

        display: ${({ $showRules }) => $showRules ? 'flex' : 'none'};
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: center;
    }
    
    .dialog__close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }

    .dialog__fig {
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 4em;
    }

    .dialog__heading {
        text-align: center;
        text-transform: uppercase;
    }

    @media (min-width: 600px) {

        border-radius: 1em;
        min-height: 0;
        min-width: 0;
        max-width: 425px;
        padding: 2em 1em;
        width: 90%;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        &::backdrop {
            backdrop-filter: brightness(50%);
        }

        .dialog__content {
            display: none;

            &--desktop {
                display: block;
            }
        }
        
        .dialog__header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 1.5em;
        }
    }
`;

const RulesModal = () => {
    const dialogRef = useRef(null);

    const { state: { showRules }, dispatch } = useContext(AppContext);

    const hideRulesModal = () => {
        dispatch({ type: 'HIDE_RULES' });
    }

    useEffect(() => {
        const dialog = dialogRef.current;

        showRules ?
            dialog?.showModal() :
            dialog?.close()

        return () => dialog?.close();
    }, [showRules]);

    return (
        <AnimatePresence>
            {showRules &&
                <Dialog
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '450px' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    ref={dialogRef}
                    $showRules={showRules}>
                    {/* Mobile view */}
                    <div className="dialog__content">
                        <motion.button
                            whileHover={{ scale: 1.125 }}
                            whileTap={{ scale: 0.9 }}
                            className='dialog__close-btn'
                            onClick={hideRulesModal}>
                            <img src={closeIcon} alt="Close icon" />
                        </motion.button>
                        <figure className='dialog__fig'>
                            <figcaption className='dialog__figc'>
                                <h2 className='dialog__heading'>Rules</h2>
                            </figcaption>
                            <img className='dialog__img' src={rulesImg} alt="Rules diagram" />
                        </figure>
                    </div>
                    {/* Desktop view */}
                    <div className="dialog__content--desktop">
                        <header className="dialog__header">
                            <h2 className='dialog__heading'>Rules</h2>

                            <motion.button
                                whileHover={{ scale: 1.125 }}
                                whileTap={{ scale: 0.9 }}
                                className='dialog__close-btn'
                                onClick={hideRulesModal}>
                                <img src={closeIcon} alt="Close icon" />
                            </motion.button>
                        </header>

                        <img className='dialog__img' src={rulesImg} alt="Rules diagram" />
                    </div>
                </Dialog>
            }
        </AnimatePresence>
    )
}

export default RulesModal;