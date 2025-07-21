// API and Data Handling Types
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  status: number;
  statusText: string;
  timestamp: string;
  path?: string;
  details?: Record<string, any>;
}

// Use the centralized ErrorContent from core.ts
import { ErrorContent } from "./core";

export interface PageErrorContent {
  notFound: ErrorContent;
  loading: ErrorContent;
  generic: ErrorContent;
} 