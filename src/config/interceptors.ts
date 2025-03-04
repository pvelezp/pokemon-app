import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

export interface ConsoleError {
  status: number;
  data: unknown;
}

// Custom function to extract error message from response data
const getErrorMessage = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }

  if (data && typeof data === 'object') {
    if ('message' in data && typeof data.message === 'string') {
      return data.message;
    }
    if ('error' in data && typeof data.error === 'string') {
      return data.error;
    }
    if ('detail' in data && typeof data.detail === 'string') {
      return data.detail;
    }
  }

  return 'An unexpected error occurred';
};

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Optionally show success toasts for certain operations
  if (
    response.config.method?.toUpperCase() === 'POST' &&
    response.status === 201
  ) {
    toast.success('Successfully created!');
  }

  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response) {
    const status = error.response.status;
    const errorMessage: ConsoleError = {
      status,
      data: error.response.data,
    };

    console.error(errorMessage);

    if (status === 401) {
      toast.error('Authentication required. Please login again.', {
        toastId: 'auth-error',
      });
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.', {
        toastId: 'permission-error',
      });
    } else if (status === 404) {
      toast.error(
        'The requested resource was not found. Try again later please',
        {
          toastId: 'not-found-error',
        }
      );
    } else if (status === 422 || status === 400) {
      const message = getErrorMessage(error.response.data);
      toast.error(message, {
        toastId: 'validation-error',
      });
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.', {
        toastId: 'server-error',
      });
    } else {
      toast.error(`Error: ${getErrorMessage(error.response.data)}`, {
        toastId: 'generic-error',
      });
    }
  } else if (error.request) {
    toast.error('Network error. Please check your connection.', {
      toastId: 'network-error',
    });
  } else {
    toast.error('An unexpected error occurred.', {
      toastId: 'unexpected-error',
    });
  }

  await Promise.reject(error);
};

// Optional: Create a toast container config function
export const getToastContainerConfig = () => ({
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
