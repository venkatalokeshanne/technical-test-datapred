const BASE_URL = "https://test-backend.i.datapred.com";

const username = "admin";
const password = "super_secret";


export async function apiAuth() {
  const token = await fetch(BASE_URL + "/auth/", {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  }).then((response) => response.text());
  return token;
}

export async function runsBasedOnDate(token,date) {
  const response = await fetch(
    BASE_URL + `/flows/1/runs?production_date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {return response.json()} );
  return response;
}

export async function runsOutputs(token,flowid,runid) {
    const response = await fetch(
        BASE_URL + `/flows/${flowid}/runs/${runid}/outputs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {return response.json()} );
      return response;
}

export async function fetchTrends(token,runid,outputId) {
    const response = await fetch(
        BASE_URL + `/flows/1/runs/${runid}/outputs/${outputId}/trends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {return response.json()} );
      return response;
}
