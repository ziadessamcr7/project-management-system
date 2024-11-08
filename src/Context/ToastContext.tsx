import React, { createContext } from 'react'
import { toast } from 'react-toastify'

export const Toaster: any = createContext(null)

export default function ToastContextProvider({ children }: any) {

    let getToast = (type: any, message: any) => {
        return toast[type](message, {
            autoClose: 2000
        })
    }



    return (
        <Toaster.provider value={{ getToast }}>
            {children}
        </Toaster.provider>
    )

}
