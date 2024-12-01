/* eslint-disable no-unused-vars */

export enum EResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ERROR = 500,
}

export enum ENUM_REF_TYPE {
  Location = "Location",
  RealEstate = "RealEstate",
  News = "News",
}

export enum ENUM_GENDER {
  Female = "Female",
  Male = "Male",
  Unknown = "Unknown",
}

export enum ENUM_ROLE {
  Admin = "Admin",
  Staff = "Staff",
  User = "User",
}