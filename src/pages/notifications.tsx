import BaseLayout from "../components/BaseLayout";
import Card from "../components/cards/Card";
import React from "react";

export default function NotificationsPage() {
    return (
        <BaseLayout hideNav={false}>
            <h1 className="text-3xl font-semibold pb-4">Notifications</h1>
            <div className='h-screen'>
                <Card padding={'none'} colour={""} expand={false}>
                    <div className='flex flex-col gap-3 p-4'>
                        <div className="flex gap-3 items-center">
                            <img src="logo192.png" alt="Supersede" className="rounded-3xl h-10" />

                            <div>Welcome!</div>
                        </div>
                            <div className='text-sm text-lTextSecondary dark:text-dTextSecondary flex flex-col gap-2'>
                                Welcome to Supersede. We hope you enjoy using our app. <br />
                                Some tips:
                                <br />
                                <p className="ml-3">
                                - Use the navigation bar on the left to navigate to different pages. <br />
                                - If you are on mobile, and prefer a more app-like experience, you can add this page to your home screen! <br />
                                - Add your interests as short separate tags, the more tags, the greater variety of posts you will see. <br />
                                </p>
                                

                                WARNING: As this is not intended to be a full fledged social media replacement and still in development, your data such as saved posts and interests may be occasionally wiped, or your account data deleted. You should be able to sign back in with Google. In the event we hit API rate limits, the app will have to be shut down until further notice.
                            </div>
                    </div>
                </Card>
                <Card padding={'none'} colour={""} expand={false}>
                    <div className='flex flex-col gap-3 p-4'>
                        <div className="flex gap-3 items-center">
                            <img src="logo192.png" alt="Supersede" className="rounded-3xl h-10" />

                            <div>Prefer an App?</div>
                        </div>
                            <div className='text-sm text-lTextSecondary dark:text-dTextSecondary flex flex-col gap-2'>
                                We have an app???
                                <br />
                                Well, not quite. But you can add this page to your home screen on mobile, and it will look and feel like an app!
                                Simple tap the 3 dot menu in the top right of your chrome browser on android or ios and select "Add to Home Screen". <br /> <a className=" font-bold hover:text-blue-500" href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid&oco=1">Learn more here</a> <br />
                            </div>
                    </div>
                </Card>
            </div>
        </BaseLayout>
    )
}