const { verifyUsernameByToken } = require("../utils/verification");
const db = require("../db/connection");

exports.selectUserSettings = async (username, token) => {
  try {
    verifyUsernameByToken(username, token);

    const response = await db.query(
      `
        SELECT * FROM user_settings
        WHERE username = $1
        `,
      [username]
    );

    if (!response.rows.length) {
      throw { status: 404, message: "Not found." };
    }

    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.createUserSettings = async (
  username,
  strategy,
  bot_on,
  risk,
  token
) => {
  try {
    verifyUsernameByToken(username, token);

    const queryValues = [username, strategy, bot_on, risk];

    const response = await db.query(
      `
        INSERT INTO user_settings 
        (username, strategy, bot_on, risk)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      queryValues
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.updateUserSettings = async (
  username,
  strategy,
  bot_on,
  risk,
  token
) => {
  try {
    verifyUsernameByToken(username, token);
    const queryValues = [username, strategy, bot_on, risk];

    let sqlQuery = `
      UPDATE user_settings 
      SET strategy = $2, bot_on = $3, risk = $4 
      WHERE username = $1
      RETURNING *
      `;

    const response = await db.query(sqlQuery, queryValues);

    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.removeUserSettings = async (username, token) => {
  try {
    verifyUsernameByToken(username, token);

    const response = await db.query(
      `DELETE FROM user_settings WHERE username = $1`,
      [username]
    );

    if (response.rowCount === 0) {
      throw { status: 404, message: "User does not exist." };
    }
  } catch (error) {
    throw error;
  }
};

exports.getRiskByUsername = async (username) => {
  try {
    const response = await db.query(
      `
      SELECT risk FROM user_settings WHERE username = $1
      `,
      [username]
    );
    return response.rows[0].risk
  } catch (error) {
    throw error;
  }
};
