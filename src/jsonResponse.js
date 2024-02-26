const users = {};
let responseCode;

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users,
    };
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    respondJSONMeta(request, response, 200);
};

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const addUsers = (request, response, userKey) => {
    const responseJSON = {
        message: 'Name and age are both required,',
    };

    if (!userKey.age || !userKey.name) {
        responseJSON.id = 'addMissingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    if (!users[userKey.name]) {
        responseCode = 201;
        users[userKey.name] = {};
    }

    users[userKey.name].age = userKey.age;
    users[userKey.name].name = userKey.name;

    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully.';
        return respondJSON(request, response, responseCode, responseJSON);
    }
    return respondJSONMeta(request, response, 204);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  addUsers,
};