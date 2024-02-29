import axios from "axios"
const Backend_url = import.meta.env.VITE_BACKEND_URL

export async function RegisterUser({ name, email, password, confirmPassword }) {
  try {
    const reqUrl = `${Backend_url}/auth/register`
    const reqParams = { name, email, password, confirmPassword };
    const response = await axios.post(reqUrl, reqParams)
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}

export async function LoginUser({ email, password }) {
  try {
    const reqUrl = `${Backend_url}/auth/login`
    const reqParams = { email, password };
    const response = await axios.post(reqUrl, reqParams)
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}

export async function changePassword(formData) {
  try {
    const reqUrl = `${Backend_url}/auth/changePassword`
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, formData);
    return response.data;
  } catch (error) {
    console.log(err);
  }
}
