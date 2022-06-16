import Title from "../../components/Title";

export default function Detail({params}) {
    // const router = useRouter(); 
    // 컴포넌트 내부에서 router를 통해서 파라미터에 접근하면 프론트 단에서만 보인다는 단점이 있음 
    const [title, id] = params || [];   
    
    return (
        <div>
            <Title title={title}></Title>
            <h4>
                {title || "loading.."}
            </h4>            
        </div>
    )
}

// 서버 측 context 객체에서 파라미터 값 props로 받아와서 다른 컴포넌트에 해당 데이터 반환 
export function getServerSideProps({params:{params}}) {
    return {
        props : {
            params
        }
    }
}