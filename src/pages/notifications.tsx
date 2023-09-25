import BaseLayout from "../components/BaseLayout";
import Card from "../components/cards/Card";
import Avatar from "../components/Avatar";
import React from "react";

export default function NotificationsPage() {
    return(
        <BaseLayout hideNav={false}>
            <h1 className='text-3xl mb-4 text-lTextPrimary dark:text-dTextPrimary '>Notifications</h1>
            <div className='h-screen'>
                <Card padding={'none'} colour={""} expand={false}>
                    <div className='flex gap-3 items-center border-b border-b-gray-400 p-4'>
                        <Avatar size="sm"></Avatar>
                        <div>John doe blah blah</div>
                    </div>
                    <div className='flex gap-3 items-center p-4'>
                        <Avatar size="sm"></Avatar>
                        <div>John doe blah blah</div>
                    </div>
                </Card>
            </div>
        </BaseLayout>
    )
}