import React from "react";
import BaseLayout from "../components/BaseLayout";

export default function Privacy() {
    return (
        <BaseLayout hideNav={true}>
            <div className="py-6 items-center my-auto md:h-full max-w-3xl">

                <div>
                    <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
                        Privacy Policy
                    </h2>
                    <p className="mt-3 text-gray-800 dark:text-dTextSecondary">
                        <span className="font-bold">Privacy Statement</span>
                        <div className="h-2"/>
                        Welcome to Supersede!

                        At Supersede, we take your privacy seriously. This privacy statement explains how we collect, use, and safeguard your personal information. By using our website and services, you agree to the practices described in this statement.

                        <div className="h-2"/>
                        <span className="font-bold">Information We Collect</span> <br />

                        We utilize Supabase authentication with Google Auth for user login. When you log in using Google Auth, we collect basic user information provided by Google for authentication purposes.

                        Additionally, we store the interests and saved posts you provide on our website's database. This data is securely stored on Supabase, and no information is shared with third parties.

                        <div className="h-2"/>
                        <span className="font-bold">How We Use Your Information</span> <br />

                        We use the information collected to enhance your experience on our website. Your interests and saved posts help us personalize your user experience and improve our content and services.

                        <div className="h-2"/>
                        <span className="font-bold">Information Sharing</span> <br />

                        We do not share your personal information with third parties. Your interests are stored anonymously on Supabase and are not associated with your email or Google name unless required for administrative purposes by Supabase.
                    </p>
                </div>
            </div>
        </BaseLayout>
    )
}