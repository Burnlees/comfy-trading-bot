const crypto = require("crypto");
const axios = require("axios");
const { URLSearchParams } = require("url");
const { apiKey, apiSecret } = require("./keys");
const { getAllApiKeys } = require("../models/apiKeys.model");

// const kraken = axios.create({
//   baseURL: "https://api.kraken.com",
//   headers: {
//     "API-Key": apiKey,
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// });

const createAxiosConnection = (apiKey) => {
  const kraken = axios.create({
    baseURL: "https://api.kraken.com",
    headers: {
      "API-Key": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return kraken;
};

const getKrakenSignature = (path, request, secret, nonce) => {
  const message = new URLSearchParams(request).toString();
  const secret_buffer = Buffer.from(secret, "base64");
  const hash = crypto.createHash("sha256");
  const hmac = crypto.createHmac("sha512", secret_buffer);
  const hash_digest = hash.update(nonce + message).digest("binary");
  const hmac_digest = hmac
    .update(path + hash_digest, "binary")
    .digest("base64");
  return hmac_digest;
};

const createNonce = () => {
  return Date.now() * 1000;
};

exports.krakenRequest = async (path, request, apiKey, apiSecret) => {
  const nonce = createNonce();
  const signature = getKrakenSignature(
    path,
    { ...request, nonce },
    apiSecret,
    nonce
  );

  const kraken = createAxiosConnection(apiKey);

  try {
    const response = await kraken.post(
      path,
      new URLSearchParams({ ...request, nonce }),
      {
        headers: { "API-Sign": signature },
      }
    );

    if (response.data.error && response.data.error.length) {
      throw new Error(response.data.error.join(", "));
    }

    return response.data.result;
  } catch (error) {
    console.error(`Error in Kraken API request (${path}):`, error);
    throw error;
  }
};

exports.validateOrderInputs = (type, volume, price, stopLoss) => {
  if (type && type !== "buy" && type !== "sell") {
    throw new Error("Invalid order type");
  }
  if ((volume && isNaN(volume)) || volume <= 0) {
    throw new Error("Invalid volume specified");
  }
  if ((price && isNaN(price)) || price <= 0) {
    throw new Error("Invalid price specified");
  }
  if ((stopLoss && isNaN(stopLoss)) || stopLoss <= 0) {
    throw new Error("Invalid stop loss specified");
  }
};

exports.roundToTwoDecimals = (num) => {
  return Math.round(num * 100) / 100;
};
