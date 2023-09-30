import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const OAuthButtons:React.FC = () => {

    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    }

    // userEffect(() => {
    //     if (userCred) {
    //         createUserDocument(userCred.user);
    //     }
    // }, [userCred])
    
    return (
        <Flex direction='column' width='100%' mb={4}>
            <Button 
                variant='oauth' 
                mb={2} 
                isLoading={loading} 
                onClick={() => signInWithGoogle()}
            >
                <Image src='/images/googlelogo.png' height='20px' mr={4}/>
                Continue with Google
            </Button>
            <Button variant='oauth'>Continue with Microsoft</Button>
            {error && <Text>{error.message}</Text>}
        </Flex>
    )
}
export default OAuthButtons;

function userEffect(arg0: () => void, arg1: (import("@firebase/auth").UserCredential | undefined)[]) {
    throw new Error('Function not implemented.');
}
