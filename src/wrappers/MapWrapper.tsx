import "../styles/mui-override.css";
import "azure-maps-drawing-tools";
import "../components/Maps/Legend/LegendControl";

import { useState, useEffect } from "react";
import MDBox from "../components/MDBox";
import MDButton from "../components/MDButton";
import { Grid, MenuItem, TextField } from "@mui/material";
import { capitalizeFirstLetter } from "../helpers/StringUtils";
import { LegendControl, LegendType } from "../components/Maps/Legend";
import { AuthenticationType, ControlOptions, ControlPosition } from "azure-maps-control";
import { getAvailableCities, getAvailableOverlays, getCityOverlay } from "../restClient/RestClient";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureCustomControls,
  IAzureMapControls
} from "react-azure-maps";

// ----=======================---- Map Options & Controls ----=======================---- //

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

const consistentZoomOptions = {
  radius: [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    //For all zoom levels 10 or lower, set the radius to 2 pixels.
    10, 2,

    //Between zoom level 10 and 22, exponentially scale the radius from 2 pixels to 50000 pixels.
    22, 50000
  ]
};

// ----=======================---- React Component ----=======================---- //

function MapWrapper() {

  // ----=======================---- Map Options ----=======================---- //

  const mapOptions = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey, subscriptionKey: process.env.REACT_APP_MAP_API_KEY
    }, style: "grayscale_light", showFeedbackLink: false, language: "en-US", center: [0, 0], zoom: 10, view: "Auto"
  };

  // ----=======================---- States, Hooks ----=======================---- //

  const [selectedCity, setCity] = useState({ name: "" } as any);
  const [availableCities, setAvailableCities] = useState([]);

  const [selectedOverlay, setOverlay] = useState("");
  const [availableOverlays, setAvailableOverlays] = useState([]);

  const [displayedOverlayUrl, setDisplayedOverlayUrl] = useState("");

  const [currentMapOptions, setMapOptions] = useState(mapOptions);
  const [forceUpdate, setForceUpdate] = useState(0);

  const handleCityChange = (event) => {
    const selectedCity = availableCities.find(city => city.name === event.target.value);

    console.log("New city selected by the UI: " + selectedCity.name);

    setCity(selectedCity);
    setMapOptions({ ...currentMapOptions, center: [selectedCity.latitude, selectedCity.longitude] });
  };

  const handleOverlayChange = (event) => {
    setOverlay(event.target.value as string);
  };

  const displaySelectedOverlay = () => {
    async function overlayFetcher() {
      const overlayUrl = await getCityOverlay(selectedCity.id, selectedOverlay.toLowerCase());
      setDisplayedOverlayUrl(overlayUrl["url"]);

      console.log("The displayed overlay URL was changed to: " + overlayUrl["url"]);
    }

    overlayFetcher().then();
  };

  useEffect(() => {
    async function citiesSetter() {
      const cities = await getAvailableCities();
      setAvailableCities(cities);
      console.log("List of cities updated.");
    }

    citiesSetter().then();
  }, []);

  useEffect(() => {
    async function overlaysSetter() {
      if (!selectedCity.name) {
        return;
      }

      setOverlay("");
      setAvailableOverlays([]);

      const overlays = await getAvailableOverlays(selectedCity.id);
      setAvailableOverlays(overlays);
      console.log("List of overlays updated.");
    }

    overlaysSetter().then();
  }, [selectedCity]);

  useEffect(() => {
    console.log("Moved map center to: " + currentMapOptions.center);
    setForceUpdate(forceUpdate + 1);
  }, [currentMapOptions]);

  // ----=======================---- DOM Elements ----=======================---- //

  return (
    <>

      {
        // TODO: Take the grid below and move it into a minimizable panel.
      }

      <Grid container paddingBottom={3}>
        <Grid item xs={12} md={12} lg={4}>
          <MDBox
            sx={{ p: 2 }}>

            <TextField
              label="City"
              style={{ minWidth: "100%" }}
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
              style={{ minWidth: "100%" }}
              select
              value={selectedOverlay}
              onChange={handleOverlayChange}
              disabled={!selectedCity.name}
            >
              {availableOverlays.map((overlay, i) =>
                <MenuItem key={i} value={capitalizeFirstLetter(overlay)}>{capitalizeFirstLetter(overlay)}</MenuItem>)}
            </TextField>

          </MDBox>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>

          <div className="stupidAssCenter">

            <MDButton
              variant="contained"
              color="info"
              disabled={!selectedOverlay}
              onClick={displaySelectedOverlay}
            >
              Display
            </MDButton>

          </div>

        </Grid>
      </Grid>

      <MDBox
        key={forceUpdate}
        shadow="lg"
        borderRadius="lg"
        style={{ overflow: "hidden" }}>

        <AzureMapsProvider>
          <div style={{ height: "70vh" }}>
            <AzureMap options={currentMapOptions} controls={controls} customControls={customControls} >
              {
                // Draw the heatmap whenever the display URL is non-empty.
                displayedOverlayUrl ?
                  (<AzureMapDataSourceProvider id={"DataSource"}
                                               dataFromUrl={displayedOverlayUrl}>
                      <AzureMapLayerProvider id={"HeatMap"} options={consistentZoomOptions} type={"HeatLayer"} />
                    </AzureMapDataSourceProvider>
                  )
                  :
                  <></>
              }
            </AzureMap>
          </div>
        </AzureMapsProvider>
      </MDBox>
    </>
  );
}

export default MapWrapper;