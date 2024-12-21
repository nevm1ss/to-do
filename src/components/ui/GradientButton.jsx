const GradientButton = ({ onClick, children, className = '' }) => {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 bottom-[-4px] h-4 bg-gradient-to-tr from-[#9747FF] via-[#FF69B4] to-[#ffb98a] rounded-lg brightness-[0.7] -z-10 transition-opacity duration-200"></div>
      <button 
        onClick={onClick}
        className={`relative w-full px-4 py-2 bg-gradient-to-tr from-[#9747FF] via-[#FF69B4] to-[#ffb98a] text-white rounded-lg transition-all duration-200 font-medium text-sm active:translate-y-1 ${className}`}
      >
        {children}
      </button>
    </div>
  )
}

export default GradientButton 