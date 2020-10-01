const adminFetch = async (adminQuery) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/graphql";
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "secret",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: adminQuery }),
  })
    .then((r) => r.json())
    .then((data) => {
      JSON.stringify(data);
      return data.data;
    });
  return await result;
};

export default adminFetch;
