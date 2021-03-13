import React from "react";
import ReactDOM from "react-dom";
import { AuthorizedAppWrap, TopNavigation } from "@fozg/fozg-ui-elements";
import "./index.css";
import App from "./App";

const Logo = () => (
  <svg width={40} height={40} viewBox="0 0 333 333">
    <g id="CodePinning" transform="translate(-426 -574)">
      <rect
        id="Rectangle_19"
        data-name="Rectangle 19"
        width="333"
        height="333"
        rx="42"
        transform="translate(426 574)"
        fill="#efd81d"
      />
      <g id="Group_4" data-name="Group 4" transform="translate(-28.89 -20.996)">
        <path
          id="Path_7"
          data-name="Path 7"
          d="M55.494,146.465,52.205,88.719H.025C.008,88.185,0,87.662,0,87.163a48.018,48.018,0,0,1,4.628-20.6A52.832,52.832,0,0,1,17.251,49.742a57.839,57.839,0,0,1,5.035-4.04V3.711A3.711,3.711,0,0,1,26,0H90.206a3.711,3.711,0,0,1,3.712,3.711V44.6a58.034,58.034,0,0,1,6.627,5.139,52.841,52.841,0,0,1,12.622,16.822,48.019,48.019,0,0,1,4.628,20.6c0,.515-.008,1.039-.025,1.555v0H65.59l3.288,57.746-6.64,6.35Z"
          transform="matrix(0.966, 0.259, -0.259, 0.966, 576.712, 672.098)"
          fill="#262626"
          opacity="0.97"
        />
        <g
          id="Group_3"
          data-name="Group 3"
          transform="translate(477.402 686.201)"
        >
          <rect
            id="Rectangle_15"
            data-name="Rectangle 15"
            width="111.384"
            height="21.329"
            transform="translate(0 78.76) rotate(-45)"
            fill="#2c2c2c"
          />
          <rect
            id="Rectangle_16"
            data-name="Rectangle 16"
            width="111.384"
            height="21.329"
            transform="translate(15.082 63.986) rotate(45)"
            fill="#2c2c2c"
          />
        </g>
        <g
          id="Group_2"
          data-name="Group 2"
          transform="translate(671.731 686.201)"
        >
          <rect
            id="Rectangle_18"
            data-name="Rectangle 18"
            width="111.384"
            height="21.329"
            transform="translate(78.76 93.842) rotate(-135)"
            fill="#2c2c2c"
          />
          <rect
            id="Rectangle_17"
            data-name="Rectangle 17"
            width="111.384"
            height="21.329"
            transform="translate(93.842 79.068) rotate(135)"
            fill="#2c2c2c"
          />
        </g>
      </g>
    </g>
  </svg>
);

ReactDOM.render(
  <React.StrictMode>
    <AuthorizedAppWrap>
      <div id="topNav">
        <TopNavigation
          icon={
            <>
              <Logo />
              <span style={{marginLeft: 10, fontWeight: 500}}>CodePinning</span>
            </>
          }
        />
      </div>
      <App />
    </AuthorizedAppWrap>
  </React.StrictMode>,
  document.getElementById("root")
);
