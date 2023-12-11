import axios from "axios";


export const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/post/all_posts",
        { withCredentials: true }
      );
      console.log(response?.data?.posts);
      return response?.data?.posts || null;
    } catch (error) {
      console.log(error)
      console.log(error?.response?.data?.message);
      throw error?.response?.data?.message || error.message
    }
  };