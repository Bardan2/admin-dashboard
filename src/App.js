import { Space } from 'antd';
import './App.css';
import AppFooter from './Components/AppFooter/AppFooter';
import AppHeader from './Components/AppHeader/AppHeader';
import PageContent from './Components/PageContent/PageContent';
import SideMenu from './Components/SideMenu/SideMenu';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className='SideMenuAndPageContent'>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
        <AppFooter/>
    </div>
  );
}

export default App;
