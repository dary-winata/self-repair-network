import Navbar from "./navbar"

const Dashboard = () => {
    return (
        <main>
            <Navbar />
            <text>Welcome {localStorage.getItem("username")}</text>
        </main>
    )
}

export default Dashboard