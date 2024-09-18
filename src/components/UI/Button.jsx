import React from 'react'
import { motion } from "framer-motion"

const Button = ({className, children, variant = 'default', ...props}) => {
  
  const baseStyle = 'w-full font-bold flex items-center justify-center rounded-lg p-4 cursor-pointer focus:outline-none transition ease-in-out';
  
  const variantStyles = {
    default: 'bg-primary text-white hover:opacity-0.5 focus:ring focus:ring-black',
    'default-outline': 'border-2 text-primary border-primary bg-transparent focus:ring focus:ring-primary',
    'red-outline': 'border-2 text-red-500 border-[#E22C2C] bg-transparent focus:ring focus:ring-[#C81D1D]',
    secondary: 'bg-secondary text-black hover:opacity-0.5 focus:ring focus:ring-primary',
    black: 'bg-[#303030] text-white hover:bg-[#5E5E5E] focus:ring focus:ring-gray-400',
    red: 'bg-[#E22C2C] text-white hover:bg-[#C81D1D] focus:ring focus:ring-[#E22C2C]',
    warning: 'bg-red-400 text-white hover:bg-[#ea6a6a] focus:ring focus:ring-red-300',
    disabled: 'bg-grey text-gray-500 disabled',
    grey: 'bg-grey text-black'
  };
  
  const combinedClasses = `${baseStyle} ${variantStyles[variant]} ${className}`

  return (
    <div>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        className={combinedClasses} {...props}>
        {children}
      </motion.button>
    </div>
  )
}

export default Button
