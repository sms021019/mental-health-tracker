const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const getUserById = (userId) => {
  const response = fetch(`http://localhost:3001/api/user/${userId}`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
  return response;
};

export const getAllUsersAPIMethod = () => {
  const res = fetch(`http://localhost:3001/api/users`, {
    ...defaultHeaders,
    method: "GET",
  })
    .then(checkStatus)
    .then(parseJSON);
  return res;
};

export const createUserAPIMethod = (user) => {
  return fetch(`http://localhost:3001/api/createUser`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(user),
  }).then(checkStatus);
};

export const updateUserAPIMethod = (userToken, form) => {
  return fetch(`http://localhost:3001/api/updateUser/${userToken}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
          // Add other headers from defaultHeaders, or define them directly here
      },
  }).then(checkStatus); // Assuming checkStatus properly checks and handles the response
};

export const submitQuestionFormResponses = (formResponses) => {
    return fetch(`http://localhost:3001/api/questionFormResponses`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(formResponses), 
    })
    .then(checkStatus)
    .then(parseJSON); 
};

export const loginUserAPIMethod = async (user) => {
    console.log("CLIENT LOGING");
    const response = await fetch(`http://localhost:3001/api/login`, {
        ...defaultHeaders,
        method: "POST",
        body: JSON.stringify(user),
    });
    console.log("RES: ", response);

    return response;
  }


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
