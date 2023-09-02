import PostCard from "../components/PostCard";
import BaseLayout from "../components/BaseLayout";

export default function Home() {
    return (
        <BaseLayout>
            <PostCard></PostCard>
            <PostCard></PostCard>
        </BaseLayout>
    )
}