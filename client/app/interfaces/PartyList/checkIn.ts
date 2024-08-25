export interface CheckIn {
    _id: string;
    userId: number;
    attendTime: string;
    userData: User
}
export interface User {
    displayName: string,
    profilePictrue: string,
    roleId: [number]
}
  
  