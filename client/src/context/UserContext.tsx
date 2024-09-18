import React, { ReactNode, createContext, useContext, useState } from 'react';
import { UserType } from '../types/UserType';
import axios from 'axios';
import { AuthContext } from './AuthContext';

type UserContextType = {
  users: UserType[] | null;
  setUsers: (users: UserType[]) => void;
  followingUser: UserType | null;
  setFollowingUser: (followingUser: UserType) => void;
  getAllUsers: () => Promise<void>;
  getUserById: (id: string) => Promise<UserType>;
  setProfileUser: (user: UserType | null) => void;
  profileUser: UserType | null;
  toggleSubscribe: (otherUserId: string, userId: string) => Promise<void>;
};

const initUserContextValue: UserContextType = {
  users: null,
  setUsers: () => {
    throw new Error('context not initialised');
  },
  followingUser: null,
  setFollowingUser: () => {
    throw new Error('context not initialised');
  },
  getAllUsers: async () => {
    throw new Error('context not initialised');
  },
  getUserById: async () => {
    throw new Error('context not initialised');
  },
  setProfileUser: () => {
    throw new Error('context not initialised');
  },
  profileUser: null,
  toggleSubscribe: async () => {
    throw new Error('context not initialised');
  },
};

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>(initUserContextValue);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [followingUser, setFollowingUser] = useState<UserType | null>(null);
  const [profileUser, setProfileUser] = useState<UserType | null>(null);
  const { getUserProfile } = useContext(AuthContext);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4003/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const result = response.data;
        console.log('all users from get users', result.data);
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const toggleSubscribe = async (otherUserId: string, userId: string) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token from usercontext', token);
      console.log('userId from userContext', userId);
      console.log('otherUserId from userContext', otherUserId);
      if (!userId) {
        console.error('User ID is not defined');
        return;
      }
      const response = await axios.post(
        `http://localhost:4003/users/${otherUserId}/subscribe`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //////
      if (response.status === 200) {
        const updatedUser = response.data;
        console.log(
          'updated user from user context after subscribing',
          updatedUser
        );
        getUserProfile();
        getAllUsers();
      }
    } catch (error) {
      console.error('Error by subscribing:', error);
    }
  };

  const getUserById = async (id: string): Promise<UserType> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:4003/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        getAllUsers,
        toggleSubscribe,
        followingUser,
        setFollowingUser,
        getUserById,
        profileUser,
        setProfileUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};