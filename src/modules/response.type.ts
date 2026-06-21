export interface RepositorieResponse {
  statusCode: number;
  success: boolean;
  timestamp: string;
  message?: string;
  data?: object;
  tempoExecucao?: number;
}
