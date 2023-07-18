import React, { useEffect ,useState} from "react";
import MediaCard from "./MediaCard";
import axios from "axios";
import MyResponsivePie from "./MyResponsivePie";

const Home = () => {
  const [TenantListdata, setTenantListdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tenantList")
      .then((response) => {
        console.log("response", response);
        setTenantListdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const datadata = [
    {
      id: "Success",
      label: "Success",
      value: 7,
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
    <div className="App">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {TenantListdata.map((tenant) => (
          <MediaCard
            key={tenant.tenantId}
            tenant={tenant}
            style={{ width: "300px" }}
            name={tenant.tenantName}
            id={tenant.tenantId}>
            <MyResponsivePie datadata={datadata} />
          </MediaCard>
          
        ))}
      </div>
    </div>
  );
};

export default Home;
