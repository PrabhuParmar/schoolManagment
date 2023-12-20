export interface UserInterFace {
    role: string;
    schoolName: string;
    name: string;
    email: string;
    phoneNumber: number;
    dob: string | number;
    gender: string;
    address: string;
    semester?: string | number;
    standard: string | number;
    medium?: string;
    subject?: string;
    qualification?: string;
    id?: number;
    qrCodeStatus: boolean;
}