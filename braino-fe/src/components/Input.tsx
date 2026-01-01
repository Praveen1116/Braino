interface InputProps {
    placeholder: string,
    reference?: any
}

export function Input({placeholder, reference}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type="text" className="p-2 m-2 bg-white outline-none rounded-xl w-68" />
    </div>
}