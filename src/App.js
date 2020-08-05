import React from 'react';

import TodoDashboardPage from './components/TodoDashboardPage';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <TodoDashboardPage />
    </div>
  );
}

export default App;
