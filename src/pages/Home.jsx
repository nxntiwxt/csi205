import React from 'react';
import Nontiwat from "/img/Nontiwat.jpg";

import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="profile-card">

        <img 
          src={Nontiwat} 
          alt="รูปของฉัน"
          className="profile-pic"
        />

        <div>
          <h1 className="profile-name">นนทิวัชร หมื่นสาย</h1>
          <p className="student-id">รหัสนักศึกษา : 67117362</p>
          
          <div className="education-info">
            <p>ชั้นปีที่ 2</p>
            <p>สาขาวิทยาการคอมพิวเตอร์ (การพัฒนาซอฟต์แวร์ Fullstack)</p>
            <p>คณะเทคโนโลยีสารสนเทศ | มหาวิทยาลัยศรีปทุม</p>
          </div>
          
          <p className="profile-intro">
            สวัสดีครับ! ผมชื่อ นนทิวัชร หมื่นสาย เป็นนักศึกษาชั้นปีที่ 2 สาขาวิทยาการคอมพิวเตอร์ (การพัฒนาซอฟต์แวร์ Fullstack) ที่มหาวิทยาลัยศรีปทุม ผมมีความสนใจในด้านการพัฒนาเว็บและแอปพลิเคชันต่างๆ และมุ่งมั่นที่จะเรียนรู้เทคโนโลยีใหม่ๆ เพื่อพัฒนาทักษะของตัวเองให้ดียิ่งขึ้น
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;