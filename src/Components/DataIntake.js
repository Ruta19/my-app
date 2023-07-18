import React, { useContext, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import CollapsibleTable from "./DataIntakeTable";
import MyContext from "../Context/MyContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import Typography from "@mui/material/Typography";

const DataIntake = () => {
  const { filter, setfilter } = useContext(MyContext);
  console.log("data inside dataintake", filter);

  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("CONTEXT in dataintake", selectedTenant);

  const [startValue, setStartValue] = React.useState(dayjs("2023-04-17"));
  const [endValue, setendValue] = React.useState(dayjs("2023-04-17"));

  return (
    <div className="App">
      <Box sx={{ p: "14px" }}>
        <Box
          sx={{
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "70px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography variant="h5">
              <b>Tenant Id :{selectedTenant}</b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  defaultValue={dayjs("2023-04-17")}
                  value={startValue}
                  onChange={(newValue) => setStartValue(newValue)}
                />
                <DatePicker
                  label="End Date"
                  defaultValue={dayjs("2023-04-17")}
                  value={endValue}
                  onChange={(newValue) => setendValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      <CollapsibleTable sDate={startValue} eDate={endValue} />
    </div>
  );
};

export default DataIntake;
