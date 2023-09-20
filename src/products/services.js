
import axios from "axios";

// Define a reusable function for API calls
export async function callApi(url, method = 'GET', data = null, headers = {}) {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });

    // You can handle different status codes or responses here
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API request failed with status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}
