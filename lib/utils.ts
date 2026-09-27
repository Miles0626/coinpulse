export { cn } from "cn"

export function formatCurrency(value: number | null | undefined, digits?: number): string {
    if (value === null || value === undefined || isNaN(value)) {
        return '$0.00';
    }

    return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits ?? 2,
        maximumFractionDigits: digits ?? 2,
    });
}

export function formatPercentage(change: number | null | undefined): string {
    if (change === null || change === undefined || isNaN(change)) {
        return '0.0%';
    }

    return `${change.toFixed(1)}%`;
}
