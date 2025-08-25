export interface LoginResponse {
    token: string;
    id: number;
    phone_number: string;
    roles_id: number;
    address: string;
    full_name: string;
    status: boolean;
}

export interface IRegisterRequest {
    full_name: string;
    phone_number: string;
    password: string;
    retype_pass: string;
    roles_id: number;
}


export interface IRole {
    id: number;
    roleName: string;
}

export interface IUser {
    id: number;
    fullName: string;
    phone_number: string;
    password: string;
    address: string;
    status: boolean;
    phoneNumber: string;
    roles_id: number;
}

export interface DepositHistoryItem {
  id: number;
  status: string;
  created_at: string;
  amount: number;
  payment_name: string;
  start_date: string;
  end_date: string;
}