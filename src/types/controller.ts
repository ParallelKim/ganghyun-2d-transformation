import { ControlForm } from "./square";
import { UseFormRegister } from "react-hook-form";

export interface NumberInputProps {
    label: string;
    name: keyof ControlForm;
    register: UseFormRegister<ControlForm>;
    error?: string;
}

export interface TransformControlProps {
    title: string;
    onApply: () => void;
    children: React.ReactNode;
}
