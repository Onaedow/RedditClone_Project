import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon, Text } from '@chakra-ui/react';
import React, { use, useRef, useState } from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post, postState } from '../../atoms/PostsAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Timestamp } from '@google-cloud/firestore';
import { firestore, storage } from '../../firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSetRecoilState } from 'recoil';
import TabItem from './TabItem';
import userSeleceFile from '../../hooks/userSeleceFile';

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText
    },
    {
        title: 'Image & Video',
        icon: IoImageOutline
    },
    {
        title: 'Link',
        icon: BsLink45Deg
    },
    {
        title: 'Poll',
        icon: BiPoll
    },
    {
        title: 'Talk',
        icon: BsMic
    },
]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
}

type NewPostFormProps = {
    user: User;
};

const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
    //next.js Router
    const router = useRouter();

    // MENU SELECTION
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    
    // text
    const [textInputs,setTextInputs] = useState({
        title: "",
        body: "",
    })

    
    //file
    // const [selectedFile, setSelectedFile] = useState<string>()
    const { selectedFile, setSelectedFile, onSelectedFile } = userSeleceFile()
    const selectFileRef = useRef<HTMLInputElement>(null);

    //loading
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const setPostItems = useSetRecoilState(postState);

    // create post
    const handleCreatePost = async () => {
        const { communityId } = router.query;

        // create new post object +> type post
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        };

        setLoading(true)
        // store the post in db
        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost)

            // check for selectedFile
            
            
            if (selectedFile) {
                // store in storage => getDownloadURL (return imageURL)
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef)

                // update post doc by adding imageURL
                await updateDoc(postDocRef, {
                    imageURL: downloadURL
                })
                console.log("HERE IS DOWNLOAD URL", downloadURL);
            }

             // redirect the user back to the communityPage using Router
            router.back()

        } catch (error: any) {
            console.log("handleCreatePostError", error.message)
            setError(true);
        }
        setLoading(false)

       

    }
    

    // // create images
    // const onSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const reader = new FileReader();

    //     // whether a valid file
    //     if (event.target.files?.[0]) {
    //         reader.readAsDataURL(event.target.files[0]);
    //     }

    //     reader.onload = (readerEvent) => {
    //         if (readerEvent.target?.result) {
    //             setSelectedFile(readerEvent.target.result as string)
    //         }
    //     }
    // }

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {target: {name, value}} = event;
        setTextInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }
    


    
    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {formTabs.map((item) => (
                    <TabItem
                        key={item.title} 
                        item={item} 
                        selected={item.title === selectedTab}
                        setSelectedTab = {setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}> 
                {selectedTab==='Post' && (<TextInputs 
                    textInputs={textInputs} 
                    onChange={onTextChange} 
                    handleCreatePost={handleCreatePost} 
                    loading={loading}
                />)}
                {selectedTab === 'Image & Video' && (
                    <ImageUpload
                        selectedFile={selectedFile} 
                        onSelectedImage={onSelectedFile}
                        setSelectedFile={setSelectedFile}
                        setSelectedTab={setSelectedTab}
                    />
                )}
            </Flex>

            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>Error creating post</Text>
                </Alert>
            )}
        </Flex>
    )
}
export default NewPostForm;