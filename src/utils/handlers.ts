// import libs
import { NextResponse } from "next/server";
import { EResponseStatus } from ".";

const baseResponse = (props: TBaseResponseProps) => {
  const { status, ...rest } = props;
  return NextResponse.json({ ...rest }, { status });
};

// OK response
export const successResponse = (props?: TOkResponseProps) => {
  const { message = "Thành công", data } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.SUCCESS, data });
};

export const createdResponse = (props?: TOkResponseProps) => {
  const { message = "Đã tạo", data } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.CREATED, data });
};

// Not OK response
export const badRequestResponse = (props?: TNotOkResponseProps) => {
  const { message = "Yêu cầu không hợp lệ", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.BAD_REQUEST, error });
};

export const unauthorizedResponse = (props?: TNotOkResponseProps) => {
  const { message = "Không được ủy quyền", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.UNAUTHORIZED, error });
};

export const forbiddenResponse = (props?: TNotOkResponseProps) => {
  const { message = "Không được phép", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.FORBIDDEN, error });
};

export const notFoundResponse = (props?: TNotOkResponseProps) => {
  const { message = "Không tìm thấy", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.NOT_FOUND, error });
};

export const errorResponse = (props?: TNotOkResponseProps) => {
  const { message = "Lỗi xử lý", error } = props ?? {};
  return baseResponse({ message, status: EResponseStatus.ERROR, error });
};
