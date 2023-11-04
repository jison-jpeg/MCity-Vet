import React from 'react'
"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';


export default function FacebookMsg() {
    return (
        <FacebookProvider appId="6509321662509467" chatSupport>
            <CustomChat pageId="1024440847702903" minimized="true" />
        </FacebookProvider>
    )
}
