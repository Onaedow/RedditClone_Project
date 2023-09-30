import React, { useEffect, useState } from 'react';
import { Community } from '../../atoms/communitiesAtom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { auth, firestore } from '../../firebase/clientApp';
import { Post } from '../../atoms/PostsAtom';
import usePosts from "../../hooks/usePosts"
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stack } from '@chakra-ui/react';
import PostLoader from './PostLoader';

type PostsProps = {
    communityData: Community;
    
};

const Posts:React.FC<PostsProps> = ({communityData}) => {
    // useAuthState
    const [user] = useAuthState(auth)

    const [loading, setLoading] = useState(false);

    const {postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost} = usePosts();
    

    const getPosts = async () => {
        try {
            setLoading(true)
            // get posts for this community
            const postsQuery = query(
                collection(firestore, 'posts'), 
                where('communityId', '==', communityData.id),
                orderBy('createdAt', 'desc')
            );
            const postDocs = await getDocs(postsQuery);

            //store in post state
            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setPostStateValue((prev: any) => ({
                ...prev,
                posts: posts as Post[]
            }))

            console.log('posts', posts)


        } catch (error: any) {
            console.log("handleCreatePostError", error.message)
            // setError(true);
        }
        setLoading(false)
    };

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            {loading ? (
                <PostLoader/>
            ) : (
                <Stack>
                    {postStateValue.posts.map((item) => (
                        <PostItem 
                            key={item.id}
                            post={item} 
                            userIsCreator={user?.uid === item.creatorId}
                            userVoteValue={postStateValue.postVotes
                                .find((vote) => vote.postId === item.id)?.voteValue
                            }
                            onVote={onVote}
                            onSelectPost={onSelectPost}
                            onDeletePost={onDeletePost}
                        />
                    ))}
                </Stack>
            )}
            
        </>

        
    )
}
export default Posts;
