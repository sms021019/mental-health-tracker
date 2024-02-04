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