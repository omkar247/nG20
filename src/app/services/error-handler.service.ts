import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    } else if (error.status === 401) {
      return 'Your session has expired. Please login again.';
    } else if (error.status === 403) {
      return 'You are not authorized to perform this action.';
    } else if (error.status === 404) {
      return 'The requested resource was not found.';
    } else if (error.status >= 500) {
      return 'Server error. Please try again later.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }
}