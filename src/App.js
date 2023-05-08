import React, { useState } from 'react';
import EntranceScreen from './components/loadingInicio/loadingInicio';
import { UserContextProvider } from './hooks/auth';
import Routes from './routes';

function App() {
  const [isLoading, setIsLoading] = useState(true);


  setTimeout(() => {
    setIsLoading(false);
  }, 3000);


  return (
    <>
      {isLoading ? (
        <EntranceScreen />
      ) : (
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      )}
    </>
  );
}

export default App;