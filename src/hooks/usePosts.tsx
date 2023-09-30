import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Post, PostVote, postState } from '../atoms/PostsAtom';
import { deleteObject, ref } from 'firebase/storage';
import { auth, firestore, storage } from '../firebase/clientApp';
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { communityState } from '../atoms/communitiesAtom';
import { authModalState } from '../atoms/authModalAtom';

const usePosts = () => {

    const [user, loadingUser] = useAuthState(auth)

    const [postStateValue, setPostStateValue] = useRecoilState(postState)

    const currentCommunity = useRecoilValue(communityState).currentCommunity;

    const setAuthModalState = useSetRecoilState(authModalState);
    
    const onVote = async (post: Post, voteAtr: number, communityId: string) => {
        if (!user?.uid) {
            setAuthModalState({open: true, view: 'login'});
            return;
        }

        //已有投票数
        const {voteStatus} = post;
        //此帖子是否投票
        const existingVote = postStateValue.postVotes.find(
            (votePost) => votePost.postId === post.id
        )

        console.log(existingVote);

        try {
            // batch写入
            const batch = writeBatch(firestore);
            // the posts that are voted
            const updatedPost = {...post};
            // array of posts
            const updatedPosts = [...postStateValue.posts];
            // which has been voted
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = voteAtr;


            // New vote
            if (!existingVote) {
                
                // 存入数据库中
                const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`))
                // create a new document post
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id,
                    communityId,
                    voteValue: voteAtr,    //1 or -1
                }

                console.log("NEW VOTE!!!", newVote);

                batch.set(postVoteRef, newVote);
                console.log("BATCH_SET successful");

                // 总数
                // add/subtract 1 to/from post.voteStatus
                updatedPost.voteStatus = voteStatus + voteAtr;
                console.log(updatedPost.voteStatus);

                // 数组里面每个数
                updatedPostVotes = [...updatedPostVotes, newVote];
                console.log(updatedPostVotes);



            } else {

                //从文件夹中找出
                const postVoteRef = doc(
                    firestore, 
                    'users', 
                    `${user?.uid}/postVotes/${existingVote.id}`
                )

                // Existing vote - they have voted on the post before
                // remove their vote
                if (existingVote.voteValue === voteAtr) {
                    // add/subtract 1 to/from post.voteStatus
                    // opposite direction
                    updatedPost.voteStatus = voteStatus - voteAtr;
                    // remove Existing vote post from the array
                    updatedPostVotes = updatedPostVotes.filter(
                        (votePost) => votePost.id !== existingVote.id
                    )

                    // delete postVote document
                    // 数据库删除
                    batch.delete(postVoteRef);

                    voteChange *= -1;

                } else {
                    //flip their vote
                    // add/subtract 2 to/from post.voteStatus
                    updatedPost.voteStatus = voteStatus + 2 * voteAtr;

                    const voteIdx = postStateValue.postVotes.findIndex(
                        (votePost) => votePost.id === existingVote.id
                    );

                    // Vote was found - findIndex returns -1 if not found
                    // update voteValue
                    if (voteIdx !== -1) {
                        updatedPostVotes[voteIdx] = {
                            ...existingVote,
                            voteValue: voteAtr
                        }
                    }

                    // updating the existing postVote document
                    batch.update(postVoteRef, {
                        voteValue: voteAtr,
                    })

                    voteChange = 2 * voteAtr;
                }
                
                // update the post document
                // 数据库里面的另外一个文件夹
                const postRef = doc(firestore, 'posts', post.id);
                batch.update(postRef, {voteStatus: voteStatus + voteChange})

                await batch.commit();

                //update state with updated values
                const postIdx = postStateValue.posts.findIndex(
                    (item) => item.id === post.id
                )
                updatedPosts[postIdx] = updatedPost;
                setPostStateValue((prev) => ({
                    ...prev,
                    posts: updatedPosts,
                    postVotes: updatedPostVotes
                }))
            }
        }  catch (error) {
            console.log('onVote Error', error)
        }
    };

    const onSelectPost = () => {};

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            // check if image, delete if exists
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }

            // delete post document from firestore
            const postDocRef = doc(firestore, 'posts', post.id!);
            await deleteDoc(postDocRef)

            // update recoil state
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id)
            }))

            return true;
        } catch (error) {
            
        }
        return true;
    };


    // render the UI
    const getCommunityPostVote = async (communityId: string) => {
        const postVotesQuery = query(
            collection(firestore, 'users', `${user?.uid}/postVotes`), 
            where("communityId", "==", communityId)
        )

        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data
        }));
        setPostStateValue((prev) => ({
            ...prev,
            postVotes: postVotes as PostVote[]
        }))
    } 

    // inside the [] is dependency
    useEffect(() => {
        if (!user || !currentCommunity?.id) return;
        getCommunityPostVote(currentCommunity?.id);
    }, [user, currentCommunity])



    // login or not?
    useEffect(() => {
        if (!user) {
            // clear user post
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: []
            }))
        }
    }, [user])

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    }
}
export default usePosts;