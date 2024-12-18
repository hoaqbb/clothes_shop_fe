
export interface User {
    email: string
    token: string
    role: string
}

export interface UserDetail {
    lastname: string
    firstname: string
    dateOfBirth: string
    email: string
    gender: number
    isAuthenticated: boolean
  }