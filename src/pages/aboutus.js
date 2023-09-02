// import '../app/globals.css';
import BaseLayout from "../components/BaseLayout";

export default function AboutUs(){
    return(
        <BaseLayout hideNav={true}>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-2xl mx-auto">

                    <div className="grid gap-12">
                        <div>
                            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
                                Our vision
                            </h2>
                            <p className="mt-3 text-gray-800 dark:text-gray-400">
                                At Supersede, we understand the allure of social media, the fascination with memes, and the draw of random content. We get it – the internet is a treasure trove of entertainment and distractions. But what if there was a way to make your scrolling experience not just enjoyable, but also enriching?
                            </p>
                        </div>

                        <div className="space-y-6 lg:space-y-10">

                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mt-2 h-6 w-6 text-gray-800 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>

                                <div className="ml-5 sm:ml-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Our Mission: Promoting Knowledge Amidst the Scroll
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        Supersede was born out of a desire to transform aimless scrolling into an opportunity for learning, growth, and discovery. We believe that your precious time spent online can be more than just a momentary diversion; it can be a journey of enlightenment.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mt-2 h-6 w-6 text-gray-800 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>

                                <div className="ml-5 sm:ml-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Three Pillars of Supersede
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400 pb-2">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        1. Mix of Memes and Wisdom: We've curated a seamless blend of memes, random fun, and educational content. This unique mix ensures that every scroll is not just entertaining but also enlightening. You'll find yourself laughing at memes, marveling at scientific discoveries, and staying informed about the world's events – all in one place.
                                    </p>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400 pb-2">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        2. Endless Learning: Say goodbye to the guilt of wasted time. [Your App Name] encourages you to explore the world of general knowledge, science, and current events. Our content is sourced from reputable outlets to ensure that you're not just consuming information but also enhancing your understanding of the world.
                                    </p>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400 pb-2">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        3. Mitigating Aimless Scrolling: We're on a mission to make scrolling meaningful. [Your App Name] is designed to captivate your attention with a purpose. As you scroll through our feed, you'll uncover fascinating tidbits of information, engaging stories, and aha moments that make your time online truly worthwhile.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex-shrink-0 mt-2 h-6 w-6 text-gray-800 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                                </svg>

                                <div className="ml-5 sm:ml-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Join the Supersede Community
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        We invite you to be part of a community that values curiosity, enlightenment, and the pursuit of knowledge. Whether you're a student, a professional, or simply someone with an insatiable appetite for learning, [Your App Name] offers a space where you can scroll with intention.

                                        Together, let's turn your screen time into a valuable investment in yourself. Discover the joy of learning, the thrill of knowledge, and the satisfaction of informed scrolling.

                                        Thank you for choosing [Your App Name] as your scrolling companion. Let's embark on this journey of discovery together.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}