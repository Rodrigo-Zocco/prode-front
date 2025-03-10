export interface CreatePredictionFormData {
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface CreatePredictionActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreatePredictionFormData]?: string[];
  };
  inputs?: CreatePredictionFormData;
}

export interface UpdateUserFormData {
  username: string;
}

export interface UpdateUserActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UpdateUserFormData]?: string[];
  };
  inputs?: UpdateUserFormData;
}
