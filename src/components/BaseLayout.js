import NavigationCard from "../components/NavigationCard";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes"

export default function BaseLayout({children, hideNav}) {
    let rightRightColumnClasses = '';
    if (hideNav){
        rightRightColumnClasses += 'w-full';
    }
    else{
        rightRightColumnClasses += 'mx-1 md:mx-0 md:w-3/4 mt-5';
    }
    return(
        <ThemeProvider attribute="class">

                <Header></Header>
        <div className='flex justify-center bg-socialBg bg-lBgMain dark:bg-dBgMain transition-all duration-500 min-h-screen'>

            <div className='md:flex max-w-4xl mx-4 gap-6 w-full'>

                {!hideNav && (
                    <div className="hidden md:block md:w-1/4">
                        <NavigationCard></NavigationCard>
                    </div>
                )}
                <div className={rightRightColumnClasses}>
                    {children}
                </div>
            </div>
        </div>
        </ThemeProvider>
    )
}