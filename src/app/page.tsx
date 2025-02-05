import GraphComponent from './components/graph-component/GraphComponent';

const Sidebar = () => (
  <aside className='sidebar'>
    <div className='sidebar-nav'>
      {/* <img src='https://store-images.s-microsoft.com/image/apps.21913.863c1661-4a23-4ffe-b1c7-b4f77b333831.708cc5a7-7813-402c-a822-441051210520.e64bdc28-9190-4f59-ad4b-c36c6009df65.png' alt='Sidebar Icon' className='sidebar-logo' /> */}
      <div className='nav-icons'>
        <div className='nav-icon'>🏠</div>
        <div className='nav-icon'>📄</div>
        <div className='nav-icon'>⚙️</div>
        <div className='nav-icon'>📊</div>
      </div>
    </div>
  </aside>
);

const Header = () => (
  <header className='header'>
    <img src='https://store-images.s-microsoft.com/image/apps.21913.863c1661-4a23-4ffe-b1c7-b4f77b333831.708cc5a7-7813-402c-a822-441051210520.e64bdc28-9190-4f59-ad4b-c36c6009df65.png' alt='Sidebar Icon' className='sidebar-logo' />
    <h1 className='header-title'>Master Recipe Authoring</h1>
    <nav className='header-nav'>
      <span>Test</span>
      <span>Time Unit: second</span>
      <span>No Active ECN</span>
      <button className='header-button'>Options</button>
    </nav>
  </header>
);

export default function Home() {
  return (
    <div className='app-container'>
      <Header />
      <div className='main-container'>
        <Sidebar />
        <div className='graph-container'>
          <GraphComponent />
        </div>
      </div>
    </div>
  );
}
