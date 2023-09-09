import React from 'react';
import { ProviderComposer } from './ProviderComposer';
import { AppProvider } from './AppContext';

const ContextProvider = ({ children }) => (
    <ProviderComposer
        contexts={[
            <AppProvider />
        ]}>
        {children}
    </ProviderComposer>
)

export default ContextProvider