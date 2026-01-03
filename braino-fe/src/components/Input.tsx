interface InputProps {
    placeholder: string,
    reference?: any,
    type?: string
}

export function Input({placeholder, reference, type}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={type} className="p-2 m-2 bg-white outline-none rounded-xl w-68" />
    </div>
}