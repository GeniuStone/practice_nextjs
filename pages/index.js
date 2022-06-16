import Link from 'next/link';
import Title from '../components/Title';
import { useRouter } from 'next/router';

// 데이터가 필요한 컴포넌트에 props를 주면 해당 컴포넌트에서 데이터 활용 가능
// 이게 가능한 이유? _app.js에서 페이지들이 pageProps를 받고 있기 때문 
export default function Home({results}) { 
    const router = useRouter();

    const onClick = (movie) => {
        router.push({
            pathname : `/movies/${movie.title}/${movie.id}`,            
        });
    }
    
    return (
        <div className="container">    
            <Title title={"Home"}/>                              
            <h1>
                {
                    results?.map(movie => (
                        <div className="movie" key={movie.id} onClick={() => onClick(movie)}>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                            <h4>
                                <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                                    <a>
                                        {movie.original_title}
                                    </a>
                                </Link>
                            </h4>
                        </div>                                                    
                    ))
                }
            </h1>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>  
    );
}

export async function getServerSideProps() {
    // api 요청 후 데이터 가져온 다음 완전히 가져올 때까지 기다렸다가 json타입으로 변환
    // 완전히 변환될 때까지 기다렸다가 결과값 저장 
    const {results} = await (await fetch('http://localhost:3000/api/movies')).json(); 

    // props라는 키를 가진 response 데이터를 반환 
    // props에는 원하는 데이터를 다 넣을 수 있다. 
    return {
        props : {
            results,
        }
    }
}