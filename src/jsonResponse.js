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
  if (users.length === 0) {
    return respondJSON(request, response, 404, { message: 'No users found.' });
  }
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
    message: 'All fields must be filled out',
  };

  if (!userKey.age || !userKey.name || !userKey.bp || !userKey.class || !userKey.weapon) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!users[userKey.name]) {
    responseCode = 201;
    users[userKey.name] = {};
  }

  users[userKey.name].age = userKey.age;
  users[userKey.name].weapon = userKey.weapon;
  users[userKey.name].class = userKey.class;
  users[userKey.name].bp = userKey.bp;
  users[userKey.name].name = userKey.name;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  responseJSON.message = 'User updated successfully.';
  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  addUsers,
};
