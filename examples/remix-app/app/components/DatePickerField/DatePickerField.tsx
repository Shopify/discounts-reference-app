import { TextField, Popover, DatePicker, Icon, Box } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

interface DatePickerFieldProps {
  label: string;
  value: Date | string | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  error?: string;
}

export function DatePickerField({
  label,
  value,
  onChange,
  minDate,
  error,
}: DatePickerFieldProps) {
  const [visible, setVisible] = useState(false);
  const [month, setMonth] = useState(
    value ? new Date(value).getMonth() : new Date().getMonth(),
  );
  const [year, setYear] = useState(
    value ? new Date(value).getFullYear() : new Date().getFullYear(),
  );

  const formatDateForInput = useCallback(
    (date: Date | string | null): string => {
      if (!date) return "";
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        return dateObj.toISOString().split("T")[0];
      }
      return "";
    },
    [],
  );

  const handleDateChange = useCallback(
    ({ start: newSelectedDate }: { start: Date; end: Date }) => {
      if (minDate && newSelectedDate < minDate) {
        return;
      }
      onChange(newSelectedDate);
      setVisible(false);
    },
    [onChange, minDate],
  );

  const handleMonthChange = useCallback((month: number, year: number) => {
    setMonth(month);
    setYear(year);
  }, []);

  return (
    <Box minWidth="276px">
      <Popover
        active={visible}
        autofocusTarget="none"
        preferredAlignment="left"
        fullWidth
        preferInputActivator={false}
        preferredPosition="below"
        preventCloseOnChildOverlayClick
        onClose={() => setVisible(false)}
        activator={
          <TextField
            role="combobox"
            label={label}
            prefix={<Icon source={CalendarIcon} />}
            value={formatDateForInput(value)}
            onFocus={() => setVisible(true)}
            onChange={() => {}}
            autoComplete="off"
            error={error}
          />
        }
      >
        <div>
          <DatePicker
            month={month}
            year={year}
            selected={value ? new Date(value) : undefined}
            onMonthChange={handleMonthChange}
            onChange={handleDateChange}
            disableDatesBefore={minDate}
          />
        </div>
      </Popover>
    </Box>
  );
}
