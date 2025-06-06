import axios from "axios";
import { AddressDto, UserRegisterDto, UserUpdateDto } from "../models";

const API_URL = "https://localhost:7029/api/User";

// Exportáljuk az UserLoginDto interfészt
export interface UserLoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    roles: string[];
  };
}

export const register = async (dto: UserRegisterDto): Promise<void> => {
  await axios.post(`${API_URL}/register`, dto);
};

export const login = async (credentials: UserLoginDto): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const updateProfile = async (userId: number, dto: UserUpdateDto): Promise<void> => {
  await axios.put(`${API_URL}/update-profile/${userId}`, dto, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateAddress = async (userId: number, dto: AddressDto): Promise<void> => {
  await axios.put(`${API_URL}/update-address/${userId}`, dto, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getCurrentUserAddress = async (): Promise<AddressDto> => {
  const response = await axios.get(`${API_URL}/Address/current`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};