import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const fetchLaunches = async () => {
  const response = await axios.get(`${BASE_URL}/launches`);
  return response.data;
};

export const fetchLaunchById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/launches/${id}`);
  return response.data;
};
