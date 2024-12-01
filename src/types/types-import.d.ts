/* eslint-disable no-unused-vars */
import { EResponseStatus } from "@/utils";

type TBaseResponseProps = {
  message: string;
  status: EResponseStatus;
  data?: TResponseData;
  error?: Error | string;
}