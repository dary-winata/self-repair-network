import Navbar from './navbar'
import background from './items/bg.jpeg'

const Home = () => {
    return (
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-12">
            <Navbar />
            <div style={{ backgroundImage: `url(${background})`, width: "100vw", height: "100vh", backgroundSize:'cover' }}>
                <div style={{ display: "flex",  width: "75vw", height: "60vh", backgroundColor: "white", borderRadius: "2%",
                    position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <text style={{ left: "100%", fontSize: "40px", maxWidth: "30vw"}}>PDIP Perjuangan Perkuat Gerak Kemanusiaan, Luncurkan Kendaraan Serbaguna</text>                </div>
            </div>
        </main>
    );
}

export default Home;