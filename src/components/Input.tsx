{/* <Input label="Username" type=text value={name} onChange={} placeholder="Enter the Name" */}

type InputProps = {
    label: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({label, type, onChange, value, placeholder}) => {

    return (
        <div className="form-group">
            <label>{label}</label>
            <input className="form-control" type={type} value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}

export default Input;