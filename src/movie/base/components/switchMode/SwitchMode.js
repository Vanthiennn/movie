
import { Input, Spin, Button, Progress } from 'antd';
import React, { useState, useEffect } from 'react'

import './index.scss'

export default function SwitchMode({ ...props }) {

    return (
        <React.Fragment>
            <div className='header' style={{ display: 'flex', alignItems: 'center', marginBottom: 20,padding:'20px 30px' }} >
                <h3 className={props.type && props.type === 'trailers' ? 'color_trailers' : ''} style={{ marginRight: 10, marginBottom: 0, fontSize: 20 }}>{props.title ? props.title : ''}</h3>

                <div className='switch-mode' style={{ display: 'flex', alignItems: 'center', borderRadius: 20, height: 34, border: '2px solid #000' }}>
                    <Button className={props.cssDefault ? 'selected' : 'none'} onClick={() => props.handleSwitchMode(props.type_1)} >
                        {props.category_1}
                    </Button>
                    <div className={props.leftSide ? 'right-to-left' : 'hide'}>
                        <h3 style={{ textAlign: 'center', marginBottom: 0, padding: '16px 20px' }}>{''}</h3>
                    </div>
                    <div className={props.leftSide === false ? 'left-to-right' : 'hide'}>
                        <h3 style={{ textAlign: 'center', marginBottom: 0, padding: '16px 20px' }}>{''}</h3>
                    </div>
                    <Button className={'none'} onClick={() => props.handleSwitchMode(props.type_2)} >
                        {props.category_2}
                    </Button>
                </div>

            </div>

        </React.Fragment>
    )
}
