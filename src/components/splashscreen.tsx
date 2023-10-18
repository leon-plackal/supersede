import React from 'react';

const SplashScreen = () => {
    return (
        <div className="flex flex-col gap-3 items-center h-screen justify-center splashfade-out">
            <div className='logo'>
                <svg width="198" height="100" viewBox="0 0 198 336" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M197.863 97.9446L99.3777 0L87.9241 11.5168L87.9868 11.5792L11.8516 87.7144L11.8459 87.7087L0.392349 99.2255L139.447 237.516L100.194 276.769L59.9968 236.793L77.9913 218.798L66.5061 207.313L48.4799 225.339L48.4535 225.313L37 236.83L100.306 299.787L111.759 288.271L111.71 288.222L153.135 246.798L153.119 246.782L162.407 237.442L23.3685 99.1679L99.5037 23.0327L175.081 98.1949L135.555 137.721L146.858 149.025L186.487 109.395L186.482 109.389L197.863 97.9446Z" fill="black" />
                    <path d="M99.2928 312.67L22.7245 236.522L58.4484 200.798L46.9631 189.313L8 228.276L8.25404 228.53L0 236.83L99.3071 335.591L109.44 325.402L109.485 325.448L186.462 248.471L186.503 248.511L197.956 236.994L60.0762 99.8718L100.594 59.3543L139.637 98.1826L118 119.819L129.485 131.304L151.153 109.636L151.17 109.652L162.623 98.1356L100.466 36.32L89.0126 47.8368L89.0769 47.9008L48.5594 88.4182L48.4535 88.313L37 99.8298L174.945 237.017L99.2928 312.67Z" fill="black" />
                </svg>
            </div>

            <h1 className="splashtext text-2xl font-bold font-font2">SUPERSEDE</h1>

            <div className="splashtext font-font1" style={{ animationDelay: '1s' }}>
                <p>No Likes</p>
            </div>

            <div className="splashtext font-font1" style={{ animationDelay: '1.75s' }}>
                <p>No Comments</p>
            </div>

            <div className="splashtext font-font1" style={{ animationDelay: '2.5s' }}>
                <p>No Distractions</p>
            </div>
        </div>
    );
};

export default SplashScreen;