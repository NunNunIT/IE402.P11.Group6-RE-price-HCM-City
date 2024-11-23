/* eslint-disable no-unused-vars */

type TResponseData = Record<string, unknown>; // Generic data type for payload or error

interface TBaseResponseProps {
  message: string;
  status: EResponseStatus;
  data?: TResponseData;
  error?: Error | string;
}

interface TOkResponseProps {
  message?: string;
  data?: TResponseData;
}

interface TNotOkResponseProps {
  message?: string;
  error?: Error | string | undefined;
}