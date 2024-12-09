const express = require("express");
const {
  placeOrder,
  cancelAllOrders,
  cancelOrderById,
  editOrder,
} = require("./controllers/order.controller");
const {
  getBalance,
  getOpenOrders,
  getPnl,
  getTradesHistory,
  getLedgerInfo,
} = require("./controllers/data.controller");
const {
  userSignUp,
  confirmUser,
  userSignIn,
  deleteUserByToken,
  changeUserPasswordByToken,
  resendAccountConfirmation,
  userForgotPassword,
  userConfirmForgotPassword,
  userSignOut,
  userAccessVerification,
} = require("./controllers/auth.controller");
const { verifyAccessToken } = require("./utils/cognito");
const {
  getUserApiKeys,
  postUserApiKeys,
  patchUserApiKeys,
  deleteUserApiKeys,
} = require("./controllers/apiKeys.controller");
const { handlePsqlErrors } = require("./errors/errorHandlers");
const { testRoute } = require("./utils/verification");
const {
  getUserSettingsByUsername,
  postUserSettingsByUsername,
  patchUserSettingsByUsername,
  deleteUserSettingsByUsername,
} = require("./controllers/userSettings.controller");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(testRoute);

// Kraken
app.get("/api/kraken/balance", verifyAccessToken, getBalance);
app.get("/api/kraken/ledger-info", verifyAccessToken, getLedgerInfo);
app.get("/api/kraken/open-orders", verifyAccessToken, getOpenOrders);
app.get("/api/kraken/pnl", verifyAccessToken, getPnl);
app.get("/api/kraken/trades-history", verifyAccessToken, getTradesHistory);
app.post("/api/kraken/create-order", placeOrder);
app.patch("/api/kraken/edit-order", verifyAccessToken, editOrder);
app.patch("/api/kraken/cancel-order", verifyAccessToken, cancelOrderById);
app.patch("/api/kraken/cancel-all-orders", verifyAccessToken, cancelAllOrders);

// Auth
app.post("/api/auth/register", userSignUp);
app.post("/api/auth/confirm-sign-up", confirmUser);
app.post("/api/auth/resend-confirmation-code", resendAccountConfirmation);
app.post("/api/auth/sign-in", userSignIn);
app.post("/api/auth/sign-out", verifyAccessToken, userSignOut);
app.post("/api/auth/forgot-password", userForgotPassword);
app.post("/api/auth/confirm-forgot-password", userConfirmForgotPassword);
app.patch("/api/auth/change-password", verifyAccessToken, changeUserPasswordByToken);
app.delete("/api/auth/delete-user", verifyAccessToken, deleteUserByToken);
app.post("/api/auth/verify-access", verifyAccessToken, userAccessVerification);

// Database
app.get("/api/db/api-keys/:username", verifyAccessToken, getUserApiKeys);
app.post("/api/db/api-keys/:username", verifyAccessToken, postUserApiKeys);
app.patch("/api/db/api-keys/:username", verifyAccessToken, patchUserApiKeys);
app.delete("/api/db/api-keys/:username", verifyAccessToken, deleteUserApiKeys);

app.get(
  "/api/db/user-settings/:username",
  verifyAccessToken,
  getUserSettingsByUsername
);
app.post(
  "/api/db/user-settings/:username",
  verifyAccessToken,
  postUserSettingsByUsername
);
app.patch(
  "/api/db/user-settings/:username",
  verifyAccessToken,
  patchUserSettingsByUsername
);
app.delete(
  "/api/db/user-settings/:username",
  verifyAccessToken,
  deleteUserSettingsByUsername
);

app.use(handlePsqlErrors);

module.exports = app;
