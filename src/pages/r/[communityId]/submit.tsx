import React from 'react';
import PageContent from '../../../components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { communityState } from '../../../atoms/communitiesAtom';
import { useRecoilValue } from 'recoil';


const SubmitPostPage:React.FC = () => {

    const [user] = useAuthState(auth)
    const communityStateValue = useRecoilValue(communityState)
    console.log('COMMUNITY', communityStateValue)
    
    return (
        <PageContent>
            <>
                <Box padding='14px 0px' borderBottom='1px solid' borderColor='white'>
                    <Text> Create a Post </Text>
                </Box>
                {user && <NewPostForm user={user}/>}
            </>
            <>

            </>
        </PageContent>
    )
}



export default SubmitPostPage;