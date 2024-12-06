import React, { useState, useEffect } from 'react';
import '../../../css/recaptcha.css';

const GRID_SIZE = 10; // 10x10 grid

const generateUniqueRandomPosition = (existingPositions: { x: number; y: number }[]) => {
    let position: { x: any; y: any; };
    do {
        position = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (existingPositions.some((p) => p.x === position.x && p.y === position.y));
    return position;
};

const Recaptcha = ({ onSolve }: { onSolve: () => void }) => {
    const [fishPosition, setFishPosition] = useState(generateUniqueRandomPosition([]));
    const [worms, setWorms] = useState([
        generateUniqueRandomPosition([fishPosition]),
        generateUniqueRandomPosition([fishPosition]),
        generateUniqueRandomPosition([fishPosition]),
    ]);
    const [hook, setHook] = useState(
        generateUniqueRandomPosition([fishPosition, ...worms])
    );
    const [message, setMessage] = useState('Eat 3 worms (🪱) to pass!');

    const handleKeyDown = (event: KeyboardEvent) => {
        setFishPosition((prev) => {
            let newPosition = { ...prev };

            switch (event.key) {
                case 'ArrowUp':
                    if (prev.y > 0) newPosition.y -= 1;
                    break;
                case 'ArrowDown':
                    if (prev.y < GRID_SIZE - 1) newPosition.y += 1;
                    break;
                case 'ArrowLeft':
                    if (prev.x > 0) newPosition.x -= 1;
                    break;
                case 'ArrowRight':
                    if (prev.x < GRID_SIZE - 1) newPosition.x += 1;
                    break;
                default:
                    break;
            }

            return newPosition;
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        // Check if the fish eats a worm
        const wormIndex = worms.findIndex(
            (worm) => worm.x === fishPosition.x && worm.y === fishPosition.y
        );

        if (wormIndex !== -1) {
            const remainingWorms = worms.filter((_, index) => index !== wormIndex);
            setWorms(remainingWorms);

            if (remainingWorms.length === 0) {
                setMessage('You passed! Enjoy the site!');
                setTimeout(onSolve, 1000);
            } else {
                setMessage(`Great! ${remainingWorms.length} worms left.`);
            }
        }

        // Check if the fish eats the hook
        if (hook.x === fishPosition.x && hook.y === fishPosition.y) {
            setMessage('You hit the hook! Resetting...');
            resetGame();
        }
    }, [fishPosition]);

    const resetGame = () => {
        const newFishPosition = generateUniqueRandomPosition([]);
        const newWorms = [
            generateUniqueRandomPosition([newFishPosition]),
            generateUniqueRandomPosition([newFishPosition]),
            generateUniqueRandomPosition([newFishPosition]),
        ];
        const newHook = generateUniqueRandomPosition([newFishPosition, ...newWorms]);

        setFishPosition(newFishPosition);
        setWorms(newWorms);
        setHook(newHook);
        setMessage('Eat 3 worms (🪱) to pass!');
    };

    return (
        <div className="recaptcha-overlay">
            <div className="recaptcha-message">{message}</div>
            <div className="grid">
                {Array.from({ length: GRID_SIZE }).map((_, row) => (
                    <div key={row} className="row">
                        {Array.from({ length: GRID_SIZE }).map((_, col) => {
                            const isFish = fishPosition.x === col && fishPosition.y === row;
                            const isWorm = worms.some((worm) => worm.x === col && worm.y === row);
                            const isHook = hook.x === col && hook.y === row;

                            return (
                                <div key={col} className="cell">
                                    {isFish ? '🐟' : isWorm ? '🪱' : isHook ? '🪝' : ''}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recaptcha;
