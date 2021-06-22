import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL ?? '';

axios.defaults.baseURL = BASE_URL;

const createCancelToken = () => {
  const { CancelToken } = axios;
  return CancelToken.source();
};

export const api = ({ onCancel, ...props }) => {
  const axiosProps = props;
  if (onCancel) {
    const { token, cancel } = createCancelToken();
    onCancel(() => cancel());
    axiosProps.cancelToken = token;
  }
  return axios(axiosProps);
};
