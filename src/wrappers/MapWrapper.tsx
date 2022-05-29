import { AzureMap, AzureMapsProvider, IAzureCustomControls, IAzureMapControls } from "react-azure-maps";
import { AuthenticationType, ControlOptions, ControlPosition } from "azure-maps-control";
import "azure-maps-drawing-tools";
import "../components/Maps/Legend/LegendControl";
import { LegendControl, LegendType } from "../components/Maps/Legend";

// TODO: In dark mode, display grayscale_dark map.

// TODO: Lock the map to a city using https://docs.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.cameraoptions?view=azure-maps-typescript-latest


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
  options: { position: "top-right" } as ControlOptions
}, {
  controlName: "ZoomControl", options: { position: "top-right" } as ControlOptions
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

const MapWrapper = () => (<AzureMapsProvider>
  <div style={{ height: "70vh" }}>
    <AzureMap options={option} controls={controls} customControls={customControls} />
  </div>
</AzureMapsProvider>);

export default MapWrapper;