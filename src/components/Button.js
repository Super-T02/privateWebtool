import React from "react";
import style from "./Button.scss";

const STYLES = [
    'btn--primary',
    'btn--outline',
]

const SIZES = [
    'btn--medium',
    'btn--large',
]

export const Button = ({

    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    className
                       }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}