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

export interface AddLeagueFormData {
  name: string;
  country: string;
  logoUrl: string;
}

export interface AddLeagueActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddLeagueFormData]?: string[];
  };
  inputs?: AddLeagueFormData;
}

export interface AddRoundFormData {
  description: string;
}

export interface AddRoundActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddRoundFormData]?: string[];
  };
  inputs?: AddRoundFormData;
}
