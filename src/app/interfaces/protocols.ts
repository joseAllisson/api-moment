export interface HttpResponse<T> {
    statusCode: number;
    body: T | responseError;
}

export interface responseError {
    error: string;
}