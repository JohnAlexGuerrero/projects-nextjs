import React from 'react'

export default function Search({data}) {
  return (
    <>
      {data.results.map(({id, original_title, title, poster_path}) =>(
        <div key={id}>
          <Image
            src={'https://image.tmdb.org/t/p/w1280'+poster_path}
            height={200}
            width={200}
            alt={original_title}
          ></Image>
          <p>{title}</p>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps({ params }) {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + params.id
      );
      const data = await res.json();
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

export async function getStaticPaths(){
    try {
        
    //   e.target[0].value = ''
      return{
        props:{
          paths,
          fallback: false,
        }
      }
    } catch (error) {
        console.log(error)
    }
}
