import type { ReactElement } from "react"

interface ButtonProps {
    title: String,
    startIcon?: ReactElement,
    variant: "primary" | "secondary" | "submission" | "danger",
    onClick?: () => void;
}

const variantClasses = {
    "primary": "bg-blue-600 text-white p-2",
    "secondary": "bg-blue-200 text-blue-500",
    "submission": "bg-teal-300 text-zinc-600 p-2",
    "danger": "bg-red-400 text-black p-2 ml-8"
}

const defaultStyles = "flex p-3 rounded-lg items-center cursor-pointer"

export const Button = ({title, startIcon, variant, onClick}: ButtonProps) => {
    return (
        <>
            <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} items-center`}>
                <div className="pr-2">{startIcon}</div>
                <div className="pr-1">{title}</div>
            </button>
        </>
    )
}