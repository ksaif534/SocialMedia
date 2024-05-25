import NavBar from "../profile/@navbar/page"
import NavSideBar from "../home/@navsidebar/page"

const FriendsPage = () => {
    const page: string = `friends`;
    return (
        <>
            <main>
                <NavBar />
                <NavSideBar page={page} />
            </main>
        </>
    )
}

export default FriendsPage