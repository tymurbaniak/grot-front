export const environment = {
  production: false,
  apiUrl: '/api',
  docker: false,
  captcha: false,
  mockBackend: true,
  disableSignalR: false
};

console.info(environment.apiUrl);