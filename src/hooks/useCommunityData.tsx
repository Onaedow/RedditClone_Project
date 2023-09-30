import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Community, communityState } from '../atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/clientApp';
import { getDocs, collection, writeBatch, doc, increment } from 'firebase/firestore';
import { CommunitySnippets } from '../atoms/communitiesAtom'
import { authModalState } from '../atoms/authModalAtom';

const useCommunityData = () => {

    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] 
        = useRecoilState(communityState)
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    // 在未登录情况下join
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined?: boolean) => {
        // Is the user signed in?
        // If not , open auth modal
        if (!user) {
            // open the modal
            setAuthModalState({open: true, view: "login"})
            return
        }

        setLoading(true)

        if (isJoined) {
            leaveCommunity(communityData.id)
            return
        }
        joinCommunity(communityData)
    }


    const getMySnippets = async () => {
        setLoading(true);

        try {
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            )

            // check if has already joined the group
            const snippets = snippetDocs.docs.map(doc => ({...doc.data()}))
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippets[]
            }))

            console.log("here are snippets", snippets)

        } catch (error: any) {
            console.log('getMySnippets Error', error)
            setError(error.message)
        }

        setLoading(false);
    }

    const joinCommunity = async (communityData: Community) => {
        // batch write
        

        try {
            const batch = writeBatch(firestore)

            // creating a new community snippet
            const newSnippet: CommunitySnippets = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || ""
            }

            batch.set(
                doc(
                    firestore, 
                    `users/${user?.uid}/communitySnippets`, 
                    communityData.id
                ),
                newSnippet
            );

            // updating the numberOfMembers (+1)
            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: increment(1),

            })

            await batch.commit()

            //update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }))

        } catch (error: any) {
            console.log('joinCommunity Error', error)
            setError(error.message)
        }

        setLoading(false)
        
    }

    const leaveCommunity = async (communityId: string) => {
        // batch write
        // deleting a new community snippet
        
        try {
            const batch = writeBatch(firestore)

            //deleting the community snippet from user
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))

            // updating the numberOfMembers (-1)
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1),
            })
            await batch.commit()

            //update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }))
            
        } catch (error: any) {
            console.log('leaveCommunity Error', error)
            setError(error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (!user) {
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets:[]
            }))
            return;
        };
        getMySnippets();
    }, [user])
    
    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;