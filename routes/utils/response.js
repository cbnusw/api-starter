exports.createResponse = createResponse;

function createResponse(res, data, message='OK', status=200) {
  res.status(status);
  return {
    success: true,
    status,
    message,
    data
  };
}
