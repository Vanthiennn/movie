import React from 'react'
import { Form, Input, Button } from 'antd'
import CarouselImage from '../../../static/6LfVuZBiOOCtqch5Ukspjb9y0EB.jpg'
export default function Carousel() {
    const handleOnChange = (e) => {
       
    }
    return (
        <div style={{ position: 'relative' }}>
            <img src={CarouselImage} width='100%' alt='Carousel image' style={{ minHeight: 300, maxHeight: 360, height: 'calc(100vh / 2.5)', backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
            <div style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                padding: 30,
                height:'100%',
                display:'flex',
                alignItems:'center'
            }}>
                <div className='carousel-content' style={{ fontSize: 20, lineHeight: '40px', margin: '30px 0' }} >
                    <h2 style={{ color: '#fff', marginBottom: 0 }}>Welcome.</h2>
                    <h3 style={{ color: '#fff', marginBottom: 0 }}>Millions of movies, TV shows and people to discover. Explore now.</h3>
                </div>
            </div>
        </div>
    )
}
