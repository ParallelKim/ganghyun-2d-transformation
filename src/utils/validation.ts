export const normalizeRotation = (angle: number): number => {
    const normalized = angle % 360;
    return normalized < 0 ? normalized + 360 : normalized;
};

export const validateInteger = (value: unknown): boolean => {
    if (typeof value !== "number") return false;
    return Number.isInteger(value);
};
