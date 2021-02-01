import OnePointSDK from "@fozg/one-point-sdk";

export const OP = new OnePointSDK(
  "https://fozg.net/opapi",
  localStorage.getItem("token")
);
