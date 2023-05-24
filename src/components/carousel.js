import React, { useState } from 'react'
import { useSnapCarousel } from 'react-snap-carousel'


const Carousel = ()=>{
  const [ movies, setMovies ] = useState([])

  const { scrollRef, pages, activePageIndex, next, prev, goTo } = useSnapCarousel()
  
  return (
    <>
      <ul
        ref={scrollRef}
        className='flex overflow-auto snap-mandatory'
      >
        {
          Array.from({ length: 10 }).map((_, i) =>(
            <li className='bg-slate-300 border mx-1 text-sm w-64 h-64 flex-shrink-0 text-white flex justify-center items-center'>
              Item { i } 
            </li>
          ))
        }

      </ul>
      <div className='flex'>
        { activePageIndex + 1 } / { pages.length }
      </div>
      <button 
        onClick={() => prev()}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold'
      >Prev</button>
      <button
        onClick={() => next()}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold'
      >Next</button>
      <ol className='flex'>
        { pages.map((_, i) =>(
          <li key={i}>
            <button
              onClick={() => goTo(i)}
              className={i === activePageIndex ? 'opacity-50' : ''}
            >
              { i + 1 }
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}


export default Carousel