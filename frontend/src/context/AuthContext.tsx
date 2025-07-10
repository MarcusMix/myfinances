import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: number;
    nome: string;
    email: string;
}

interface AuthContextData {
    user: User | null;
    signIn: (user: User) => Promise<void>;
    signOut: () => Promise<void>;
    loadingAuth: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const [loadingAuth, setLoadingAuth] = useState(true); // Começa como "carregando"

    // valida se tem token existente
    useEffect(() => {
        async function loadStoredUser() {
            try {
                const storedUser = await AsyncStorage.getItem('user'); 
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Erro ao carregar usuário salvo:", error);
            } finally {
                setLoadingAuth(false); 
            }
        }
        loadStoredUser(); 
    }, []);


    const signIn = async (userData: User) => {
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    };

    const signOut = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 