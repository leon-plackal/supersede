export default function Card({children, padding}){
    let pad = 'p-4'
    if (padding === 'none'){
        pad = ''
    }
    return (
        <div className={`transition-all duration-500 bg-lCardBg dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md ${pad} mb-5`}>
            {children}
        </div>
    );
}