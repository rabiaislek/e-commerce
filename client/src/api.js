import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    console.log("origin", origin)

    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    console.log("allowedOrigins", allowedOrigins)
    
    const token = localStorage.getItem('access-token');
    console.log("token", token)

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


export const fetchProductList = async ({ pageParam = 1 }) => {


  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
  );
  return data;
};

export const fetchProduct = async (id) => {
  console.log("datafetch-id", id);

  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
  );
  console.log("datafetch_proroduct_id", data);
  return data;
};

export const postProduct = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
		input
	);

	return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    input
  );

  return data;
};

export const fetchLogin = async (input) => {
console.log("fetchLogin", input)

  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    input
  );

  return data;
};

export const fetchMe = async () => {
  // const config = {
  //   headers: { 'Authorization': 'Bearer ' + access-token }
  // }

  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
console.log("authme", data)
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );

  return data;
};

export const postOrder = async (input) => {
  const {data} = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
    input
  )

  return data;
}

export const fetchOrders = async () => {
  const {data} = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`
  )

  return data;
}

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`
  )

  return data;
}

export const updateProduct = async (input, product_id) => {
  const {data} = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,
    input
  )

  return data;
}
