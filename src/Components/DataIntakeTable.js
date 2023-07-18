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
import axios from "axios";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import MyResponsivePie from "./MyResponsivePie";

function Row(props) {
  console.log("----------props.Sval", props.Sval);


  const datadata = [
    {
      id: "Success",
      label: "Success",
      value: props.Sval,
      color: "hsl(288, 70%, 50%)",
    },
    {
      "id": "Fail",
      "label": "Fail",
      "value": props.Fval,
      "color": "hsl(0, 100%, 50%)"
    },
    {
      id: "Warning",
      label: "Warning",
      value: props.Wval,
      color: "hsl(60, 100%, 50%)",
    },
  ];
  const handleClickOpen = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen1(false);
  };

 
  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("Tenant Selected", selectedTenant);

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

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

        <TableCell component="th" scope="row">
          {row.startTime}
        </TableCell>
        <TableCell>{row.endTime}</TableCell>
        <TableCell>{row.validationStatus}</TableCell>
        <TableCell>{row.processingStatus}</TableCell>
        <TableCell style={{ display: "right", justifyContent: "center" }}>
          <Button
            variant="outlined"
            sx={{ borderColor: "black", color: "black" }}
            onClick={handleClickOpen}
          >
            View Chart
          </Button>
          <Dialog
            open={open1}
            onClose={handleClose}
            maxWidth="md"
            style={{ display: "flex", justifyContent: "center" }}
            PaperProps={{
              style: {
                width: "1250px",
                height: "550px",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle>View Chart</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Paper style={{ width: "100%", height: "100%" }}>
                  
                  <MyResponsivePie datadata={datadata} />
                </Paper>
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "fit-content",
                }}
              ></Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </TableCell>
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
                    <TableCell>File Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Reads</TableCell>
                    <TableCell>Errors</TableCell>
                    <TableCell>Warns</TableCell>
                    <TableCell>Ignores</TableCell>
                    <TableCell>Writes</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fileData.map((historyRow) => (
                    <TableRow key={historyRow.File_Name}>
                      <TableCell component="th" scope="row">
                        {historyRow.File_Name}
                      </TableCell>
                      <TableCell>{historyRow.Start_Time}</TableCell>
                      <TableCell>{historyRow.End_Time}</TableCell>
                      <TableCell>{historyRow.Reads}</TableCell>
                      <TableCell> {historyRow.Errors}</TableCell>
                      <TableCell> {historyRow.Warns}</TableCell>
                      <TableCell> {historyRow.Ignores}</TableCell>
                      <TableCell> {historyRow.Writes}</TableCell>
                      <TableCell> {historyRow.Status}</TableCell>
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

export default function CollapsibleTable(props) {
  const [data, setdata] = useState([]);
  const { selectedTenant } = useContext(MyContext);

  // console.log("This TenantID we selected from nav", selectedTenant);

  console.log("Start Date", props.sDate);
  console.log("End Date", props.eDate);

  useEffect(() => {
    axios
      .get("http://localhost:3000/dataIntake")
      .then((response) => {
        console.log("dataIntake in table", response);

        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [Scounter, setScounter] = useState(0);
  const [Wcounter, setWcounter] = useState(0);
  const [Fcounter, setFcounter] = useState(0);

  const filteredData = data.filter((row) => row.tenantId === selectedTenant);

  const nextFilter = filteredData.filter((row) => {
    const formattedStartTime = dayjs(row.startTime).format("YYYY-MM-DD");
    console.log("formattedStartTime op", formattedStartTime);

    const formattedStartTime2 = dayjs(props.sDate).format("YYYY-MM-DD");
    const formattedEndTime2 = dayjs(props.eDate).format("YYYY-MM-DD");

    console.log("formattedStartTime 2", formattedStartTime2);
    console.log("formattedEndTime 2", formattedEndTime2);

    const formattedEndTime = dayjs(row.endTime).format("YYYY-MM-DD");
    console.log("formattedEndTime op", formattedEndTime);

    console.log("formattedStartTime2 op", formattedStartTime2);
    console.log("formattedEndTime op", formattedEndTime);

    return (
      formattedEndTime === formattedEndTime2 ||
      formattedStartTime === formattedStartTime2
    );
  });

  useEffect(() => {
    const successCount = nextFilter.reduce((count, row) => {
      const successFiles = row.fileData.filter(
        (ele) => ele.Status === "Success"
      );
      return count + successFiles.length;
    }, 0);
    setScounter(successCount);
  }, [nextFilter]);

  useEffect(() => {
    const WarnCount = nextFilter.reduce((count, row) => {
      const WarnFiles = row.fileData.filter((ele) => ele.Status === "Warning");
      return count + WarnFiles.length;
    }, 0);
    setWcounter(WarnCount);
  }, [nextFilter]);
  console.log("filterdata", filteredData);
  console.log("nextfilter", nextFilter);

  useEffect(() => {
    const FailCount = nextFilter.reduce((count, row) => {
      const FailFiles = row.fileData.filter((ele) => ele.Status === "Fail");
      return count + FailFiles.length;
    }, 0);
    setFcounter(FailCount);
  }, [nextFilter]);

  console.log("filterdata", filteredData);
  console.log("nextfilter", nextFilter);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="DataIntakeTable table">
        <TableHead>
          <TableRow style={{ width: "100%", backgroundColor: "#f0f0f0" }}>
            <TableCell></TableCell>
            <TableCell style={{ fontWeight: "bold", color: "black" }}>
              Start Time
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>End Time</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Validation Status
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Processing Status
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Chart Analysis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nextFilter.map((row) => (
            <Row key={row.tenantId} row={row} Sval={Scounter} Wval={Wcounter} Fval={Fcounter} />
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
