export const environment = {
  production: false,
  apiUrl: '/api',
  docker: false,
  captcha: false,
  mockBackend: true,
  disableSignalR: true
};

console.info(environment.apiUrl);