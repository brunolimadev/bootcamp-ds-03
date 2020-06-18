import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  } , [])


  async function handleAddRepository() {
    // TODO
    const result = await api.post('repositories',
      {
        title: `desafio 03# reactjs  - ${Date.now()}`,
        url: "desafio#03",
        techs: "javascript, nodejs, html, css e react"
      })

      const repository = result.data;

      setRepository([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    const filteredRepositories = repositories.filter(repository => {
      return repository.id !== id
    })
  
    setRepository([...filteredRepositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
