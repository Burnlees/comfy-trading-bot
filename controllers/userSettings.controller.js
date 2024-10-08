const {
  selectUserSettings,
  createUserSettings,
  updateUserSettings,
  removeUserSettings,
} = require("../models/userSettings.model");

exports.getUserSettingsByUsername = async (req, res, next) => {
  const { username } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const userSettings = await selectUserSettings(username, token);
    res.status(200).send({ userSettings });
  } catch (error) {
    if (!error.status) {
      return next(error);
    }
    res.status(error.status).send({ message: error.message });
  }
};

exports.postUserSettingsByUsername = async (req, res, next) => {
  const { username } = req.params;
  const { strategy, bot_on } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const userSettings = await createUserSettings(
      username,
      strategy,
      bot_on,
      token
    );
    res.status(201).send({ userSettings });
  } catch (error) {
    if (!error.status) {
      return next(error);
    }
    res.status(error.status).send({ message: error.message });
  }
};

exports.patchUserSettingsByUsername = async (req, res, next) => {
  const { username } = req.params;
  const { strategy, bot_on } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const userSettings = await updateUserSettings(
      username,
      strategy,
      bot_on,
      token
    );
    res.status(200).send({ userSettings });
  } catch (error) {
    if (!error.status) {
      return next(error);
    }
    res.status(error.status).send({ message: error.message });
  }
};

exports.deleteUserSettingsByUsername = async (req, res, next) => {
  const { username } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    await removeUserSettings(username, token);
    res.status(204).send();
  } catch (error) {
    if (!error.status) {
      return next(error);
    }
    res.status(error.status).send({ message: error.message });
  }
};
