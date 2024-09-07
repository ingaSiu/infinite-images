import axios from 'axios';

const httpClient = () => {
  // Create instance
  const instance = axios.create();

  // cookie based auth enabled with each request
  instance.defaults.withCredentials = true;
  //add json headers to each request
  instance.interceptors.request.use((config) => {
    config.headers['Content-Type'] = `application/json`;
    return config;
  });

  return instance;
};

export default httpClient();
