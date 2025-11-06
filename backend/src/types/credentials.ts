interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

export type { LoginCredentials, RegisterCredentials };
