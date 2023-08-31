import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
        <p> 중부대학교 정보보호학전공  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
