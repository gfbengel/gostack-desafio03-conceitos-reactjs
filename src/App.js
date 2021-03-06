import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const title = `novo repositório ${Date.now()}`
    const url = `http://github.com/${Date.now()}`

    const techs = [
      `tech ${Math.round(Math.random() * 1000)}`,
      `tech ${Math.round(Math.random() * 1000)}`,
      `tech ${Math.round(Math.random() * 1000)}`
    ]
    const response = await api.post('/repositories', {
			title, url, techs
		})
		const repo = response.data

		setRepositories([...repositories, repo])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories(
      repositories.filter(repo => repo.id !== id)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
