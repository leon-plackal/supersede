
export default function Avatar({size}) {
    let width = 'w-12';
    if (size === 'lg'){
        width = 'w-24'
    }
    else if(size === 'md'){
        width = 'w-20'
    }
    return(
        <div className={`${width} rounded-full overflow-hidden`}>
            <img src="/profile.jpg" alt=""/>
        </div>
    )
}