import "../styles/mui-override.css";
import "azure-maps-drawing-tools";
import "../components/Maps/Legend/LegendControl";

import { useState, useEffect } from "react";
import MDBox from "../components/MDBox";
import MDButton from "../components/MDButton";
import { Grid, MenuItem, TextField } from "@mui/material";
import { LegendControl, LegendType } from "../components/Maps/Legend";
import { AuthenticationType, ControlOptions, ControlPosition } from "azure-maps-control";
import { AzureMap, AzureMapsProvider, IAzureCustomControls, IAzureMapControls } from "react-azure-maps";
import { getAvailableCities, getAvailableOverlays, getCityOverlay } from "../restClient/RestClient";
import { capitalizeFirstLetter } from "../helpers/StringUtils";

const option = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey, subscriptionKey: ""
  }, style: "grayscale_light", showFeedbackLink: false, language: "en-US", center: [14.4, 50.1], zoom: 10, view: "Auto"
};

// @ts-ignore
const legends: LegendType[] = [
  {
    type: "gradient",
    subtitle: "Gradient legend",

    // @ts-ignore
    stops: [{
      offset: 0, color: "royalblue", label: "low"
    }, {
      offset: 0.25, color: "cyan"
    }, {
      offset: 0.5, color: "lime", label: "medium"
    }, {
      offset: 0.75, color: "yellow"
    }, {
      offset: 1, color: "red", label: "high"
    }]
  },

  //A gradient legend with stepped color stops.
  {
    type: "gradient",
    subtitle: "Gradient legend - stepped",

    // @ts-ignore
    stops: [{
      offset: 0, color: "#03939c", label: "< -1"
    }, {
      offset: 0.167, color: "#03939c"
    }, {
      offset: 0.167, color: "#5ebabf"
    }, {
      offset: 0.334, color: "#5ebabf"
    }, {
      offset: 0.334, color: "#bae1e2"
    }, {
      offset: 0.501, color: "#bae1e2"
    }, {
      offset: 0.501, color: "#f8c0aa", label: "0"
    }, {
      offset: 0.668, color: "#f8c0aa"
    }, {
      offset: 0.668, color: "#dd7755"
    }, {
      offset: 0.835, color: "#dd7755"
    }, {
      offset: 0.835, color: "#c22e00"
    }, {
      offset: 1, color: "#c22e00", label: "> 1"
    }]
  }];

//Add the custom control to the map.
const legend = new LegendControl({
  //Global title to display for the legend.
  title: "Legend",
  legends: legends

  //How the legend control should layout multiple legend cards. Options: 'list' | 'carousel' | 'accordion'
  // layout: 'accordion',

  //container: 'outsidePanel',
});

const controls: IAzureMapControls[] = [{
  controlName: "CompassControl",
  controlOptions: { rotationDegreesDelta: 10 },
  options: { position: ControlPosition.TopLeft } as ControlOptions
}, {
  controlName: "ZoomControl", options: { position: ControlPosition.TopLeft } as ControlOptions
}];

// @ts-ignore
const customControls: [IAzureCustomControls] = [
  {
    // @ts-ignore
    control: legend,
    controlOptions: {
      position: ControlPosition.BottomLeft
    }
  }
];

function MapWrapper() {
  const [selectedCity, setCity] = useState({} as any );
  const [availableCities, setAvailableCities] = useState([]);

  const [selectedOverlay, setOverlay] = useState("");
  const [availableOverlays, setAvailableOverlays] = useState([]);

  const handleCityChange = (event) => {
    setCity(event.target.value as string);
  };

  const handleOverlayChange = (event) => {
    setOverlay(event.target.value as string);
  };

  useEffect(() => {
    async function citiesSetter() {
      const cities = await getAvailableCities();
      setAvailableCities(cities);
      console.log("List of cities updated.")
    }

    citiesSetter().then();
  }, []);

  useEffect(() => {
    async function overlaysSetter() {
      if (!selectedCity.name) {
        return;
      }

      const overlays = await getAvailableOverlays(selectedCity.name);
      setAvailableOverlays(overlays);
      console.log("List of overlays updated.")
    }

    overlaysSetter().then();
  }, [selectedCity]);

  return (
    <>
      <Grid paddingBottom={3}>
        <Grid item xs={12} md={12} lg={4}>
          <MDBox
            sx={{ p: 2 }}>

            <TextField
              label="City"
              style={{ width: "200px" }}
              select
              value={selectedCity.name}
              onChange={handleCityChange}
            >
              {availableCities.map((city, i) => <MenuItem key={i} value={city.name}>{city.name}</MenuItem>)}
            </TextField>

          </MDBox>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <MDBox
            sx={{ p: 2 }}>

            <TextField
              label="Data"
              style={{ minWidth: "200px" }}
              select
              value={selectedOverlay}
              onChange={handleOverlayChange}
              disabled={!selectedCity}
            >
              {availableOverlays.map((overlay, i) =>
                <MenuItem key={i} value={capitalizeFirstLetter(overlay)}>{capitalizeFirstLetter(overlay)}</MenuItem>)}
            </TextField>

          </MDBox>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>

          <div className="stupidAssCenter">
            <MDButton variant="contained" color="info">Display</MDButton>
          </div>

        </Grid>
      </Grid>

      <MDBox
        shadow="lg"
        borderRadius="lg"
        style={{ overflow: "hidden" }}>

        <AzureMapsProvider>
          <div style={{ height: "70vh" }}>
            <AzureMap options={option} controls={controls} customControls={customControls} />
          </div>
        </AzureMapsProvider>

      </MDBox>
    </>
  );
}

export default MapWrapper;