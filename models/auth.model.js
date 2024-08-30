const { signUp, confirmSignUp, signIn } = require("../utils/cognito");

exports.createUser = async (email, password) => {
  try {
    const signUpDetails = await signUp(email, password);

    const response = {
      requestId: signUpDetails.$metadata.requestId,
      userSub: signUpDetails.UserSub,
      codeDestination: signUpDetails.CodeDeliveryDetails.Destination,
    };

    return response;
  } catch (error) {
    const errorMessage = {
      status: error.$metadata.httpStatusCode,
      msg: error.message,
    };
    throw errorMessage;
  }
};

exports.validateUser = async (email, code) => {
  try {
    await confirmSignUp(email, code);
    return true;
  } catch (error) {
    const errorMessage = {
      status: error.$metadata.httpStatusCode,
      msg: error.message,
    };
    throw errorMessage;
  }
};

exports.authenticateUser = async (email, password) => {
  try {
    const authenticationDetails = await signIn(email, password);
    return authenticationDetails;
  } catch (error) {
    console.log(error);
    
    const errorMessage = {
      status: error.$metadata.httpStatusCode,
      msg: error.message,
    };
    throw errorMessage;
  }
};
