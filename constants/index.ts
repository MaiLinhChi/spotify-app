export interface IconProps {
    width?: number;
    height?: number;
    className?: string;
}

export interface AuthResponse {
    access_token: string;
    expires_in: number | string;
}
