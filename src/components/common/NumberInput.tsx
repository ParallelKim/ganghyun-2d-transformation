interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
    error?: string;
}

export const NumberInput = ({ label, value, onChange, error }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseInt(e.target.value);
        onChange(numValue);
    };

    return (
        <div className="input-row">
            <label>{label}:</label>
            <input
                type="number"
                value={value}
                onChange={handleChange}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
