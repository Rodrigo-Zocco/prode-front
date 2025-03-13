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

export interface AddTeamFormData {
  name: string;
  logoUrl: string;
}

export interface AddTeamActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddTeamFormData]?: string[];
  };
  inputs?: AddTeamFormData;
}

export interface EditMatchFormData {
  status?: string;
  highlighted?: boolean;
  homeTeamScore?: number;
  awayTeamScore?: number;
}

export interface EditMatchActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof EditMatchFormData]?: string[];
  };
  inputs?: EditMatchFormData;
}

export interface AddMatchFormData {
  highlighted: boolean;
  homeTeamId: number;
  awayTeamId: number;
}

export interface AddMatchActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AddMatchFormData]?: string[];
  };
  inputs?: AddMatchFormData;
}
