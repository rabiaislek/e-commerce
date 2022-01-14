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
// ***********************************
// '[failed to construct 'url' invalid]' => url hatasi cozumu
// url hatasindan yola cikarak once buraya log attim.b fetchProductList geliyor.
// Acaba url dorgru diye de log attim ama URL undefined geldi, .env dosyasina baktim dogru gorunuyor 
// ama surekli undefined geliyor. Dedim ki bu .env dosyasi nasil kullanilir.
// yani global bir dosyaya statik degiskenlerimizi atip (api'larimiz gibi) projenin herhangi bir yerinde kullanalim
// .env dosyasinin root yani kok dizinde olmadigini farkettim.
//  dosyayi src => client a tasidim. dosyalarda degisiklik yaptigim icin node vs herseyi kapatip yeniden compile ettim
// boylelikle sorun cozulmus oldu. ~mi <3 sen benim kahramanimsiiinnn :* "6.1.22 07.50"
// ************************************
export const fetchProductList = async ({ pageParam = 1 }) => {
//  console.log("fetchProductList...");
//  console.log('process.env.REACT_APP_BASE_ENDPOINT', process.env.REACT_APP_BASE_ENDPOINT)

  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
  );
//  console.log("datafetchlist", data);
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
