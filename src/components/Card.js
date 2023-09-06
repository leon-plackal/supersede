export default function Card({children, padding, colour}){
    let pad = 'p-3 md:p-4'
    if (padding === 'none'){
        pad = ''
    }
    let bgColor = 'bg-lCardBg';
    if(colour){
        bgColor = `bg-${colour}`
    }

    let classname = `overflow-hidden transition-all duration-500 ${bgColor} dark:bg-dCardBg text-lTextPrimary dark:text-dTextPrimary shadow-md shadow-gray-300 dark:shadow-black rounded-md ${pad} mb-5`
    function expandCard(){
        classname = 'absolute top-0 left-0 w-full h-full'
        console.log(classname)
    }

    return (
        <div className='cursor-pointer' onClick={expandCard}>
            <div className={classname}>
                {children}
            </div>
        </div>
    );
}