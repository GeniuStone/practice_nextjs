import NavBar from "./NavBar";

export default function Layout({children}) {
    return (
        <div>                      
            <NavBar></NavBar>
            <div>
                {children}
            </div>
        </div>
    );
}