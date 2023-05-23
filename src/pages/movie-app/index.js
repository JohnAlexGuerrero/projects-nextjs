import React, { useEffect } from 'react'
import Image from 'next/image'
import { getStaticPaths } from './[search]'


export default function MovieApp({ data }) {
  const [query, setQuery] = React.useState('')
  const [movies, setMovies] = React.useState([])

  useEffect(()=>{
    setMovies(data.results)
  },[])

  const handleQuery = async(event)=>{
    setQuery(event.target.value)
  }

  const handleSearch = async ()=>{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${query}`)
    const data_search = await res.json()
    setMovies(data_search.results)

    console.log(movies)
  }

  const hasMovies = movies.length > 0

  console.log(hasMovies)


  return (
    <>
      <div>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={query}
          onChange={handleQuery}
          placeholder='Search Movie'
        />
        <button type='submit' onClick={handleSearch}>Submit</button>
      </div>

      <h1>Lista de artículos</h1>

      <div className="px-10 pt-5 flex flex-col gap-10">
        {
          hasMovies
          ? movies.map(({id, original_title, title, poster_path}) =>(
              <div key={id}>
                <Image
                  src={'https://image.tmdb.org/t/p/w1280/'+poster_path}
                  height={200}
                  width={200}
                  alt={original_title}
                ></Image>
                <p>{title}</p>
              </div>
            ))
          : (
              <div className=" bg-red-400 text-white text-center p-10">
                <p>No se encontraron pokemones que coincidan con la búsqueda</p>
                <span className=" text-md font-thin">Prueba buscar por otro nombre</span>
              </div>
          )
        }
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1')
    const data = await res.json()

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

// const handleSearchForm = async function getStaticProps(e){
//   e.preventDefault();
//   const searchMovie = e.target[0].value

//   if (searchMovie !== '') {
//     try {
//       const res = await fetch( + searchMovie)
//       const data = await res.json()
//       console.log(data)

//       return{
//         props:{
//           data,
//         }
//       }
//     } catch (error) {
//       console.log(error)
//     }


//   }else{
//     window.location.reload()
//   }    

//   console.log(searchMovie)

//   e.target[0].value = ''
// }

