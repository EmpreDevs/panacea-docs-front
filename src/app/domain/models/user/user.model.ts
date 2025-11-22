import { BaseModel } from "../common/base.model";

export interface User extends BaseModel {
  email: string
  password: string
  name: string
  role: string
  avatar?: string
  preferences?: any
}