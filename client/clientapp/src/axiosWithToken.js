import axios from 'axios';

const getAxiosWithToken = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default getAxiosWithToken;
