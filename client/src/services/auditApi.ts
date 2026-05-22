import axios from "axios";

const API_BASE_URL =
  "http://localhost:5000/api";

export const runAuditRequest = async (
  payload: any
) => {
  const response = await axios.post(
    `${API_BASE_URL}/audit/run`,
    payload
  );

  return response.data;
};