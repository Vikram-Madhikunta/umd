import { ApiUser } from "./types";
import { ApiUserSchema , User , UserSchema } from "./schemas";
import { measureMemory } from "vm";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export class ApiError extends Error {
    constructor(
        message : string,
        public status?: number,
        public statusText ?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const rawData = await apiRequest<ApiUser[]>('/users');
    
    const validatedUsers = rawData.map(user => UserSchema.parse(user));
    
    return validatedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError('Invalid data received from server');
  }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    const rawData = await apiRequest<ApiUser>(`/users/${id}`);
    
    const validatedUser = ApiUserSchema.transform((apiUser) => ({
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      phone: apiUser.phone,
      city: apiUser.address.city,
    })).parse(rawData);
    
    return validatedUser;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error instanceof ApiError ? error : new ApiError('Failed to fetch user');
  }
}


export function filterUsers(users: User[], searchTerm: string): User[] {
  if (!searchTerm.trim()) {
    return users;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return users.filter(user => 
    user.name.toLowerCase().includes(term) ||
    user.city.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
}

export async function addUser(userData: {
  basicInfo: {
    phone: string; name: string; email: string 
};
  addressInfo: { street: string; city: string; zip: string };
}): Promise<{ success: boolean; message: string; user?: User }> {

  await new Promise(resolve => setTimeout(resolve, 1000));
  

  console.log('New user data:', userData);
  
  const newUser: User = {
    id: Date.now(),
    name: userData.basicInfo.name,
    email: userData.basicInfo.email,
    phone: userData.basicInfo.phone, 
    city: userData.addressInfo.city,
  };

  
  return {
    success: true,
    message: 'User added successfully!',
    user: newUser,
  };
}
