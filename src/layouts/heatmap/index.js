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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import { useEffect, useCallback, useState } from "react";
import MapWrapper from "../../wrappers/MapWrapper";

import "../../styles/azure-maps-layer-legend.css";
import "../../styles/mui-override.css";


async function fetchMergedWeeklyPassRateData() {

  const response = await fetch("https://unitchallenge.azurewebsites.net/api/BaseAnalysis/GetMergedWeeklyPassRate", {
    method: "GET", mode: "cors", headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}

/*
async function fetchStats() {

  const response = await fetch("https://unitchallenge.azurewebsites.net/api/BaseAnalysis/GetWeeklyStats", {
    method: "GET", mode: "cors", headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}
*/

export default function Heatmap() {
  return (<DashboardLayout>
    <DashboardNavbar />
    <MapWrapper />
  </DashboardLayout>);
}
