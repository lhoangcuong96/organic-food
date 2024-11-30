import { authApiRequest } from "@/api-request/auth";
import { HttpError } from "@/lib/http";
import { console } from "inspector";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const requestBody = await request.json();
  /*
    Vì sessionToken đã hết hạn (sessionToken đã xoá trên server nodejs)
    => client gọi forceLogout=true để server nextjs set lại cookie
  */
  const forceLogout = requestBody.forceLogout as boolean | undefined;
  console.log(forceLogout);
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken || !sessionToken.value) {
    return Response.json(
      {
        message: "Không nhận được sessionToken",
      },
      {
        status: 401,
      }
    );
  }
  if (forceLogout) {
    return Response.json(
      {
        message: "Phiên đăng nhập đã hết hạn",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; PATH=/; HttpOnly`,
        },
      }
    );
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToApiServer(
      sessionToken.value
    );
    return Response.json(result, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; PATH=/; HttpOnly`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
