import { useCallback } from "react";

interface DatePickerFieldProps {
  label: string;
  value: Date | string | null | [Date | string | null, Date | string | null];
  onChange: (date: Date | [Date, Date]) => void;
  minDate?: Date;
  error?: string;
  type?: "single" | "range";
}

export function DatePickerField({
  label,
  value,
  onChange,
  minDate,
  error,
  type = "single",
}: DatePickerFieldProps) {
  const formatDate = useCallback((date: Date | string | null): string => {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  }, []);

  const formatValue = useCallback(
    (
      value:
        | Date
        | string
        | null
        | [Date | string | null, Date | string | null],
    ): string => {
      if (!value) return "";

      if (type === "range" && Array.isArray(value)) {
        const startDate = formatDate(value[0]);
        const endDate = formatDate(value[1]);
        if (!startDate) return "";
        return endDate ? `${startDate}--${endDate}` : startDate;
      }

      return formatDate(value as Date | string | null);
    },
    [type, formatDate],
  );

  const handleChange = useCallback(
    (event: any) => {
      const dateString = event.target.value;
      if (!dateString) return;

      if (type === "range" && dateString.includes("--")) {
        const [start, end] = dateString.split("--");
        if (start && end) {
          onChange([new Date(start), new Date(end)]);
        }
      } else if (type === "single") {
        onChange(new Date(dateString));
      }
    },
    [onChange, type],
  );

  const getDisallowDates = useCallback((minDate: Date) => {
    const disallowDate = new Date(minDate.getTime() - 86400000);
    return `--${disallowDate.toISOString().split("T")[0]}`;
  }, []);

  return (
    <s-stack direction="block" gap="small">
      {label ? <s-paragraph>{label}</s-paragraph> : null}
      <s-date-picker
        type={type}
        value={formatValue(value)}
        disallow={minDate ? getDisallowDates(minDate) : undefined}
        onChange={handleChange}
      />
      {error ? <s-text tone="critical">{error}</s-text> : null}
    </s-stack>
  );
}
