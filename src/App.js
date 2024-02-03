import styles from './App.module.css'
import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])

  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    httpConfig(product, "POST")

    setName("")
    setPrice("")
  }

  const handleDelete = (id) => {
    httpConfig(id, "DELETE")
  }

  return (
    <div className="App">
      <h1>Lista de produtos</h1>

      {loading && (
        <p>Carregando...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!error && (
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - R${product.price}<button onClick={() => handleDelete(product.id)}>Deletar</button></li>
          ))}
        </ul>
      )}


      <div className={styles.addProduct}>
        <h1>Cadastrar produto</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nome:</p>
            <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <p>Preço:</p>
            <input type='number' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {loading && (
            <input type='submit' value='Aguarde' disabled />
          )}
          {!loading && (
            <input type='submit' value='Cadastrar' />
          )}
        </form>
      </div>

    </div>
  );
}

export default App;
