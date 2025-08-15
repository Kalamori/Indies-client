import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
  <section className="hero flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '60px 20px' }}>
    <h1 className="hero-title">🍛 Welcome to Indies</h1>
    <p className="hero-subtitle">
      Discover the flavour of our growing Indian takeaway — with big dreams of 
      becoming a national franchise.
    </p>
    <p className="hero-description">
      Use this platform to explore our menus, see what’s cooking, 
      and get inspired for your next meal.
    </p>
    <div className="hero-buttons">
      <Link to="/menus" className="btn-primary">View Menus</Link>
    </div>
  </section>
</div>
  )
}

export default Home