"use client";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Card } from "@mui/material";

type ICalendarProps = {
  value?: Dayjs | null;
  onChange: (val: Dayjs | null) => void;
};

const baseTheme = createTheme();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTheme = (theme: any) =>
  createTheme({
    ...theme,
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: "#1E1924",
            "&:hover": {
              backgroundColor: "#5598FF1A",
              color: "#FFFFFF",
            },
            "&.Mui-selected": {
              backgroundColor: "#60a5fa",
              "&:hover": {
                backgroundColor: "#5598FF1A",
              },
            },
          },
        },
      },
    },
  });

export default function BasicDatePicker(props: ICalendarProps) {
  return (
    <ThemeProvider theme={CustomTheme(baseTheme)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="p-2">
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={props.value}
            onChange={props.onChange}
            maxDate={dayjs()}
            // minDate={dayjs("2024-06-01")}
          />
        </Card>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
