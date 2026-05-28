export interface RegisterParams {
    name: string;
    email: string;
    password: string;
}
export interface LoginParams {
    email: string;
    password: string;
}

export interface TokenData {
    user_id: number;
    name: string;
    email: string;
}

