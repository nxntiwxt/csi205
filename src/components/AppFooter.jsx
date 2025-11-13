import Facebook from '/img/Facebook_Logo.png';
import Instagram from '/img/Instagram_logo.png';

import './AppFooter.css';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="footer-info">
        <p>มหาวิทยาลัยศรีปทุม | คณะเทคโนโลยีสารสนเทศ | สาขาวิทยาการคอมพิวเตอร์</p>
      </div>
    
      <div className="footer-social">
       <a href="https://www.instagram.com/nxnms_zz/" target="_blank">
  <img src={Facebook} style={{ width: '40px', height: '40px' }} />
</a>

<a href="https://www.facebook.com/profile.php?id=61582999805611" target="_blank">
  <img src={Instagram} style={{ width: '40px', height: '40px' }} />
</a>

      </div>

      <p className="footer-copy">© 2025 Sripatum University</p>
    </footer>
  );
};

export default AppFooter;