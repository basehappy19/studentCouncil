export interface Response {
    data?: any
    message:string,
    type: 'success' | 'error' | 'info' | 'warning';
}