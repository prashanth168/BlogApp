import React from 'react'
import { useRouteError } from 'react-router-dom'
function ErrorHandler() {
let routingEroor=useRouteError()
console.log(routingEroor)

  return (
    <div>ErrorHandler</div>
  )
}

export default ErrorHandler