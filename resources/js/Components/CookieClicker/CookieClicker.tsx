import React, { useEffect, useRef, useState } from 'react';
import '../../../css/cookieclicker.css';

const MIN_SAFE_DISTANCE = 200; // Distance at which the cookie teleports
const TELEPORT_DISTANCE = 500; // Minimum distance the cookie teleports away
const MIN_SPAWN_TIME = 60000; // 1 minute in milliseconds
const MAX_SPAWN_TIME = 180000; // 3 minutes in milliseconds

const getTeleportPosition = (mouseX: number, mouseY: number) => {
    let position;

    do {
        // Generate a random position
        position = {
            top: Math.random() * (window.innerHeight - 100),
            left: Math.random() * (window.innerWidth - 100),
        };

        // Calculate the distance from the mouse
        const distance = Math.sqrt(
            Math.pow(position.left - mouseX, 2) + Math.pow(position.top - mouseY, 2)
        );

        // Ensure the new position is at least TELEPORT_DISTANCE away
        if (distance >= TELEPORT_DISTANCE) break;
    } while (true);

    return position;
};

const CookieClicker = ({ onUnlock }: { onUnlock: () => void }) => {
    const [cookiePosition, setCookiePosition] = useState({ top: 0, left: 0 });
    const [showCookie, setShowCookie] = useState(false);
    const mousePosition = useRef({ x: 0, y: 0 });

    const handleMouseMove = (event: MouseEvent) => {
        // Update the current mouse position
        mousePosition.current = { x: event.clientX, y: event.clientY };

        // Calculate the distance between the mouse and the cookie
        const distance = Math.sqrt(
            Math.pow(cookiePosition.left - event.clientX, 2) +
            Math.pow(cookiePosition.top - event.clientY, 2)
        );

        if (distance < MIN_SAFE_DISTANCE) {
            // Teleport the cookie to a new random position
            const newPosition = getTeleportPosition(
                mousePosition.current.x,
                mousePosition.current.y
            );
            setCookiePosition(newPosition);
        }
    };

    useEffect(() => {
        const spawnCookie = () => {
            setShowCookie(true);

            // Spawn the cookie at a random initial position
            const initialPosition = {
                top: Math.random() * (window.innerHeight - 100),
                left: Math.random() * (window.innerWidth - 100),
            };
            setCookiePosition(initialPosition);

            // Add mousemove listener to track mouse position
            window.addEventListener('mousemove', handleMouseMove);
        };

        const scheduleNextSpawn = () => {
            const randomTime =
                Math.random() * (MAX_SPAWN_TIME - MIN_SPAWN_TIME) + MIN_SPAWN_TIME;
            setTimeout(() => {
                spawnCookie();
            }, randomTime);
        };

        if (!showCookie) {
            scheduleNextSpawn();
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [showCookie]);

    const handleCookieClick = () => {
        setShowCookie(false);
        onUnlock(); // Unlock the site

        // Schedule the next cookie spawn
        const randomTime =
            Math.random() * (MAX_SPAWN_TIME - MIN_SPAWN_TIME) + MIN_SPAWN_TIME;
        setTimeout(() => {
            setShowCookie(true);
        }, randomTime);
    };

    return (
        <>
            {/* Full-screen overlay to block interactions */}
            {showCookie && (
                <div className="cookie-overlay">
                    <div className="flashing-message">Catch that darn cookie!</div>
                </div>
            )}

            {/* Cookie */}
            {showCookie && (
                <div
                    className="cookie"
                    style={{
                        position: 'absolute',
                        top: `${cookiePosition.top}px`,
                        left: `${cookiePosition.left}px`,
                        cursor: 'pointer',
                        zIndex: 1001,
                    }}
                    onClick={handleCookieClick}
                >
                    🍪
                </div>
            )}
        </>
    );
};

export default CookieClicker;
