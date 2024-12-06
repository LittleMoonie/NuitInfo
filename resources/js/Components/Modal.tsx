import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                position: "relative",
                width: "80%",
                maxWidth: "400px",
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                X
            </button>
            {children}
        </div>
    );
};

export default Modal;
