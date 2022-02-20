export interface admin {
    id: string,
    name: string,
    email: string,
}

export interface changePasswordStatus {
    msg: string,
    success: boolean
}

export interface adminStatus {
    id?: string,
    email?: string,
    token?: string,
    msg: string,
    success: boolean
}

