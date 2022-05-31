/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {

  return (<DashboardLayout>
    <DashboardNavbar />
    <MDBox mt={6} mb={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h5">Tutorial Messages</MDTypography>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  Welcome to Locato! This is a tutorial to help you get started.
                </MDTypography>
              </MDAlert>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  Are you going on a trip? Or, perhaps, moving to a new city?
                  <br />
                  Use Locato to improve your experience.
                  Locato will help you find the best areas to visit based on your preferences.
                </MDTypography>
              </MDAlert>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  Check out the Heatmap page to see a visual representation of interesting data.
                </MDTypography>
              </MDAlert>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  Start by selecting a city. You should see the map change to the city you selected.
                </MDTypography>
              </MDAlert>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  Then, a list of available data overlay options will appear. Select the data you want to see and hit "Display".
                </MDTypography>
              </MDAlert>
            </MDBox>
            <MDBox pt={2} px={2}>
              <MDAlert color={"info"} dismissible>
                <MDTypography variant="body2" color="white">
                  A heatmap layer will appear on the map. Feel free to explore the map and see what you find interesting.
                  <br />
                  Scroll down the page to hide the selection dialog and see the entire map.
                </MDTypography>
              </MDAlert>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  </DashboardLayout>);
}

export default Notifications;
