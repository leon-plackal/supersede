export default function Card({children, padding, colour}){
    let pad = 'p-4'
    if (padding === 'none'){
        pad = ''
    }
    let bgColor = 'bg-lCardBg';
    if(colour){
        bgColor = `bg-${colour}`
    }
    return (
        <div className={`transition-all duration-500 ${bgColor} dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md ${pad} mb-5`}>
            {children}
        </div>
    );
}