/* eslint-disable no-unused-vars */
import { ENUM_RESPONSE_STATUS } from "@/utils";

type TBaseResponseProps = {
  message: string;
  status: ENUM_RESPONSE_STATUS;
  data?: TResponseData;
  error?: Error | string;
}