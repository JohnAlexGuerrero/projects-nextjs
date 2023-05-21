import Link from "next/link";

export default function articulo({ data }) {
  return (
    <>
    <h1>Lista de artículos</h1>
      {data.map(({ id, title, body }) => (
        <div key={id}>
          <h3>
            <Link href={`/articulo/${id}`}>
                {id} - {title}
            </Link>
          </h3>
          <p>{body}</p>
        </div>
      ))}
    </>
      
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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