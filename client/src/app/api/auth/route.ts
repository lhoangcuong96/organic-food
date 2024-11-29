export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.token;

  if (!sessionToken) {
    return Response.json(
      {
        message: "Không nhận được sessionToken",
      },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    { res },
    {
      status: 200,
      // sử dụng PATH=/ để apply cookie cho toàn domain chứ k phải chỉ 1 path bất kì
      /*
        HttpOnly => dưới client k thể truy cập dc
        => để dưới client cũng có thể gọi api => sử dụng contextApi
      */
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; PATH=/; HttpOnly`,
      },
    }
  );
}
