export const environment = {
  production: false,
  apiUrl: 'https://localhost:44330',
  docker: false,
  captcha: true,
  mockBackend: false
};

console.info(environment.apiUrl);