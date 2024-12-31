import React from 'react'
import {CircleAlert} from 'lucide-react'
const Notification = ({notification}) => {
  return (
    <div className="fixed mx-6 top-8  lg:right-8  lg:m-0 bg-red-200 shadow-lg rounded-lg p-4 flex items-center space-x-3 z-50">
              {notification.icon ? notification.icon : <CircleAlert className="text-red-600" /> }
              <span className="text-black">{notification.message}</span>
            </div>
  )
}

export default Notification