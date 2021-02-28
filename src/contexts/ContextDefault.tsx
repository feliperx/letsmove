import { createContext, ReactNode } from 'react'; 

interface ContextData {

} 

interface ProviderProps {
    children: ReactNode;
} 

export const Context = createContext ({} as ContextData); 

export function Provider({children} : ProviderProps) {
    return(
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}