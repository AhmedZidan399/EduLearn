export interface AuthFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    agreeToTerms: boolean;
}

export interface AuthFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    general?: string;
}

export interface AuthMode {
    type: 'login' | 'register';
    role: 'student' | 'admin';
}

export interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}

export interface SocialAuthProvider {
    id: string;
    name: string;
    icon: string;
    color: string;
}