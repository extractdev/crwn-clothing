import React from 'react'
import './style.scss'

export default ({ title, imageUrl, size }) => (
    <div className={`${size} menu-item`}>
        <div className='background-image' style = {{
        backgroundImage: `url(${imageUrl})`
        }} />
            <div className='content'>
                <h1 className='title'>{title}</h1>
                <span className='sub-title'>SHOP NOW</span>
            </div>
    
    </div>
)