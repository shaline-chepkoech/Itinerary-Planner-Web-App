import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = 
createAuthProvider({
    accessTokenKey: 'access_token', 
    onUpdateToken:(token) => fetch('https://backend-1-hpyb.onrender.com/auth/refresh', {
            method: 'POST',
            body: token.refresh_token,
        })
        .then(r => r.json())
})