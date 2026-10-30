const unexpectedError = "Something went wrong. Please try again later.";

export async function getApiErrorMessage(response, action){
  if (action === "login" && response.status === 401){
    return "Wrong username or password. Please try again.";
  }

  if (action === "signup" && response.status === 409){
    return "Account already exists. Please use a different username/email.";
  }

  if ([502, 503, 504].includes(response.status)){
    return "Server is down. Please try again later.";
  }

  if (response.status !== 400 && response.status !== 422) return unexpectedError;

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    return unexpectedError;
  }

  const message = payload?.message ?? payload?.detail;
  if (
    typeof message === "string" &&
    message.length <= 200 &&
    !/(exception|stack|sql|database|org\.springframework|java\.|internal server|mongo|jwt|token)/i.test(message)
  ){
    return message;
  }

  return unexpectedError;
}

export function getRequestFailureMessage(error){
  return error instanceof TypeError
    ? "Server is down. Please try again later."
    : unexpectedError;
}
