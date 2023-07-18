import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MyContext from "../Context/MyContext";
import { DataContext } from "../Context/DataContext";

import dayjs from "dayjs";

function Row(props) {
  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("Tenant Selected", selectedTenant);

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log("props in row", Object.values(row));
  console.log(" row.fileHeader[0]", row.fileHeader[0]);
  console.log("type in row", typeof row);

  if (!row.fileHeader || !row.fileData) {
    return null; // or return a placeholder component or loading state
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {Object.values(row.fileHeader[0]).map((value, innerIndex) => (
          <TableCell key={innerIndex} scope="row">
            {value}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {Object.keys(row.fileData[0]).map((heading, index) => (
                      <TableCell key={index} component="th" scope="row">
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fileData.map((historyRow, index) => (
                    <TableRow key={index}>
                      {Object.values(historyRow).map((value, innerIndex) => (
                        <TableCell key={innerIndex} component="th" scope="row">
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TableCommon(props) {
  const { selectedTenant } = useContext(MyContext);
  console.log("This TenantID we selected from nav", selectedTenant);

  //take data from database (json server int the form of props )

  console.log("props.data", props.datasent);
  console.log("Start Date", props.sDate);
  console.log("real_date", props.realDate);
  const filteredData = props.datasent.filter(
    (row) => row.tenantId === selectedTenant
  );

  let formattedDateTime = "";
  filteredData.forEach((item) => {
    item.fileHeader.forEach((header) => {
      formattedDateTime = dayjs(
        header.StartTime,
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ).format("YYYY-MM-DD");
      console.log("//////////////formattedDateTime", formattedDateTime);
    });
  });
  console.log("filterdata", filteredData);

  const formattedStartTime2 = dayjs(props.sDate).format("YYYY-MM-DD");
  console.log("formattedStartTime 2", formattedStartTime2);

  const nextFilter = filteredData.filter((row) => {
    console.log("selected date", formattedDateTime);
    console.log("formattedStartTime2 op", formattedStartTime2);

    return formattedDateTime === formattedStartTime2;
  });

  console.log("filterdata", filteredData);
  console.log("nextfilter", nextFilter);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#f0f0f0" }}>
            {props.headers.map((cell, index) => (
              <TableCell key={index} style={cell.style}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {nextFilter.map((row) => (
            <Row key={row.tenantId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Details: PropTypes.arrayOf(
      PropTypes.shape({
        Status: PropTypes.number.isRequired,
        Writes: PropTypes.number.isRequired,
        Writes: PropTypes.number.isRequired,
        Ignores: PropTypes.number.isRequired,
        Ignores: PropTypes.number.isRequired,
        Wanrs: PropTypes.number.isRequired,
        Warns: PropTypes.number.isRequired,
        Errors: PropTypes.number.isRequired,
        Errors: PropTypes.number.isRequired,
        Reads: PropTypes.number.isRequired,
        End_Time: PropTypes.number.isRequired,
        Start_Time: PropTypes.string.isRequired,
        File_Name: PropTypes.string.isRequired,
      })
    ).isRequired,
    Start_Time: PropTypes.string.isRequired,
    End_Time: PropTypes.string.isRequired,
    Validation_status: PropTypes.string.isRequired,
    Processing_status: PropTypes.string.isRequired,
  }).isRequired,
};
