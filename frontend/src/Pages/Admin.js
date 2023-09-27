import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import { Card, CardContent, Typography, Grid } from "@mui/material";

import TimeSlotInput from "../Components/TimeSlot";
import Calendar from "../Components/classSchedule";
import Registration from "./Registration";
import GymCheckInOut from "../Components/CheckInOut";

import GymUsageDashboard from "../Components/HoursDashboard";
import VisitorAnalyticsDashboard from "../Components/VisitorsDashboard";
import EquipmentAnalyticsDashboard from "../Components/EquipmentDashboard";

import axios from "axios";
import { BACKEND_URL } from "../config";

const AdminHome = () => {
  const [basicActive, setBasicActive] = useState("Your classes");
  const [enrollments, setEnrollments] = useState({});
  let userdetails = JSON.parse(window.sessionStorage.getItem("userdetails"));

  useEffect(() => {
    getEnrollments();
  }, []);

  const getEnrollments = async () => {
    const res = await axios
      .get(
        `${BACKEND_URL}/enroll/getEnrollmentByEmail/${userdetails?.email}`
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("ER:", data);
    setEnrollments(data);
    return data;
  };

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  return (
    <>
    {(userdetails?.role=="admin"||userdetails?.role=="Admin")?
    <section style={{ backgroundColor: "#eee", paddingTop: "40px" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol></MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="2" style={{ paddingTop: "500px" }}>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">First Name: {userdetails?.firstname} </p>
                <p className="text-muted mb-1">Last Name: {userdetails?.lastname}</p>
                <p className="text-muted mb-4">
                  Role : {userdetails?.role}                
                </p>
                <div className="d-flex justify-content-center mb-2"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="10" style={{ paddingTop: "500px" }}>
            <MDBCard
              className="mb-4"
              style={{
                width: 1000,
                margin: "auto",
                padding: "20px",
              }}
            >
              <MDBTabs className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("Your classes")}
                    active={basicActive === "Your classes"}
                  >
                    Registration
                  </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("Log hours")}
                    active={basicActive === "Log hours"}
                  >
                    Check-In / Check-Out
                  </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("Visitor Analytics")}
                    active={basicActive === "Visitor Analytics"}
                  >
                    Visitor Analytics
                  </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("Gym Analytics")}
                    active={basicActive === "Gym Analytics"}
                  >
                    Gym Usage Analytics
                  </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("Equipment Analytics")}
                    active={basicActive === "Equipment Analytics"}
                  >
                    Equipment Analytics
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane
                  show={basicActive === "Your classes"}
                  sx={{
                    height: 1000,
                  }}
                >
                  <Registration setBasicActive = {setBasicActive}/>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "Gym Analytics"}>
                  <Card sx={{ height: 1000, margin: "auto" }}>
                    <CardContent>
                      <GymUsageDashboard setBasicActive = {setBasicActive}/>
                    </CardContent>
                  </Card>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "Equipment Analytics"}>
                  <Card
                    sx={{
                      height: 1000,
                    }}
                  >
                    <CardContent>
                      <EquipmentAnalyticsDashboard />
                    </CardContent>
                  </Card>
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === "Visitor Analytics"}>
                  <Card
                    sx={{
                      height: 1000,
                    }}
                  >
                    <CardContent>
                      <VisitorAnalyticsDashboard />
                    </CardContent>
                  </Card>
                </MDBTabsPane>
                <MDBTabsPane show={basicActive === "Log hours"}>
                  <Card
                    sx={{
                      height: 1000,
                    }}
                  >
                    <CardContent>
                      <GymCheckInOut />
                    </CardContent>
                  </Card>
                </MDBTabsPane>
                <MDBTabsPane
                  show={basicActive === "Class Signup"}
                ></MDBTabsPane>
              </MDBTabsContent>
              <MDBCardBody></MDBCardBody>
            </MDBCard>

            <MDBRow></MDBRow>
          </MDBCol>
        </MDBRow>
        {/* <VisitorAnalyticsDashboard /> */}
        {/* <Calendar selectedLocation={selectedLocation} /> */}
      </MDBContainer>
    </section>:<p>You are not authorized to access this page</p>}
    </>
  );
};
export default AdminHome;
