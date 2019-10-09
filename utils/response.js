const response_success = (data, message) => ({
  data,
  message
});

const response_fail = message => ({
  message
});

module.exports = { response_success, response_fail };
