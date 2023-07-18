import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MyContext from "../Context/MyContext";
import MyResponsivePie from "./MyResponsivePie";
import axios from "axios";
import { Link } from 'react-router-dom';



export default function MediaCard(props) {
  const [data, setdata] = useState([]);
  const [Scounter, setScounter] = useState(0);
  const [Wcounter, setWcounter] = useState(0);
  const [Fcounter, setFcounter] = useState(0);

  console.log("...................props.name", props.name);

  // const history = useHistory();

  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("CONTEXT in Home", selectedTenant);


  const onChangeHandler = (event) => {
    
    setSelectedTenant(props.id);
  
  //   history.push(`/data-intake/${props.name}`);
  };

  
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

  
  console.log("data",data);
  useEffect(() => {
    const successCount = data.reduce((count, row) => {
      const successFiles = row.fileData.filter(
        (ele) => ele.Status === "Success"
      );
      return count + successFiles.length;
    }, 0);
    setScounter(successCount);
  }, [data]);

  useEffect(() => {
    const WarnCount = data.reduce((count, row) => {
      const WarnFiles = row.fileData.filter((ele) => ele.Status === "Warning");
      return count + WarnFiles.length;
    }, 0);
    setWcounter(WarnCount);
  }, [data]);
  // console.log("filterdata", filteredData);
  // console.log("filteredData", filteredData);

  useEffect(() => {
    const FailCount = data.reduce((count, row) => {
      const FailFiles = row.fileData.filter((ele) => ele.Status === "Fail");
      return count + FailFiles.length;
    }, 0);
    setFcounter(FailCount);
  }, [data]);
  console.log("Scounter",Scounter);
    const datadata = [
    {
      id: "Success",
      label: "Success",
      value: Scounter,
      color: "hsl(288, 70%, 50%)",
    },
    {
      "id": "Fail",
      "label": "Fail",
      "value": 9,
      "color": "hsl(0, 100%, 50%)"
    },
    {
      id: "Warning",
      label: "Warning",
      value: 4,
      color: "hsl(60, 100%, 50%)",
    },
  ];

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        
      />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "280px",
        height: "150px"}}>
      <MyResponsivePie datadata={datadata} showLegends={false}/>
      </div>
      <CardContent style={{ textAlign: "center" }} >
        <Typography gutterBottom variant="h5" component="div" >
          {props.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
      <Button size="large" component={Link} to={`/DataIntake`}    onClick={onChangeHandler}> Data Intake
        </Button>
       
      </CardActions>
    </Card>
  );
}
