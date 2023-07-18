import React, { useEffect, useState, useContext } from "react";
import TableCommon from "./TableCommon";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import CollapsibleTable from "./DataIntakeTable";
import MyContext from "../Context/MyContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const DataValidation = (props) => {
  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("CONTEXT in dataintake", selectedTenant);
  console.log("data____", props.data);
  const [startValue, setStartValue] = React.useState(dayjs("2023-04-17"));
  const [endValue, setendValue] = React.useState(dayjs("2023-04-17"));

  const [data, setdata] = useState([]);

  // const formattedStartTime = dayjs(data.DateTime).format("YYYY-MM-DD");
  // console.log("formattedStartTime in Validation",formattedStartTime);

  useEffect(() => {
    axios
      .get("http://localhost:3000/dataValidation")
      .then((response) => {
        console.log("dataValidation in table", response);

        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let formattedDateTime = "";
  console.log(".......data", data);
  if (data.length) {
    data.forEach((item) => {
      item.fileHeader.forEach((header) => {
        const formattedDateTime = dayjs(
          header.DateTime,
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ).format("YYYY-MM-DD");
        console.log("=======formattedDateTime", formattedDateTime);
      });
    });
  }

  const headers = [
    { label: "", style: {} },
    { label: "DateTime", style: { fontWeight: "bold", color: "black" } },
    { label: "ZipFileName", style: { fontWeight: "bold" } },
  ];

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
                  defaultValue={dayjs("2022-04-17")}
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

      <TableCommon
        datasent={data}
        headers={headers}
        sDate={startValue}
        eDate={endValue}
        //realDate={formattedDateTime}
      />
    </div>
  );
};

export default DataValidation;
