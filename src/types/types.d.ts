/* eslint-disable no-unused-vars */
type TPosition = {
  lat: number;
  long: number;
};

type TResponseData = Record<string, unknown>;

type TOkResponseProps = {
  message?: string;
  data?: TResponseData | TResponseData[];
}

type TNotOkResponseProps = {
  message?: string;
  error?: Error | string | undefined;
}
