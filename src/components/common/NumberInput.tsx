interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
    error?: string;
}

export const NumberInput = ({ label, value, onChange, error }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || e.target.value === "-") {
            onChange(0);
            return;
        }

        const numValue = Number(e.target.value);
        onChange(numValue);
    };

    return (
        <div className="input-row">
            <label>{label}:</label>
            <input
                type="number"
                value={value || ""}
                onChange={handleChange}
                min={-Infinity}
                step="1"
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
