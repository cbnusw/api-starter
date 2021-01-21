const httpErrors = require('http-errors');

const createError = err => {
  const e = httpErrors(err[0], err[1]);
  e.code = err[2];
  return e;
};

const errors = {
  // 여기에 HTTP Error 추가
  INVALID_ACCESS_TOKEN: [401, '유효하지 않은 액세스 토큰입니다.'],
  INVALID_REFRESH_TOKEN: [401, '유효하지 않은 리프레시 토큰입니다.'],
  LOGIN_REQUIRED: [401, '로그인이 필요합니다.'],

  FORBIDDEN: [403, '권한이 없는 요청입니다.'],

  POST_NOT_FOUND: [404, '찾을 수 없는 글입니다.'],
  NOT_FOUND: [404, '찾을 수 없는 요청입니다.'],

  ACCESS_TOKEN_EXPIRED: [419, '만료된 액세스 토큰입니다.'],
  REFRESH_TOKEN_EXPIRED: [419, '만료된 리프레시 토큰입니다.'],
};

Object.keys(errors)
  .forEach(key => errors[key] = createError([...errors[key], key]));

module.exports = errors;
