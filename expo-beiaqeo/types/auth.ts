import { RecordModel } from "pocketbase";

export interface AuthRecord extends RecordModel {
  email: string;
  name: string;
  avatar: string;
}