import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, {useRef} from 'react';

type ImageUploadProps = {
    selectedFile?: string
    onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload:React.FC<ImageUploadProps> = ( {selectedFile, onSelectedImage, setSelectedTab, setSelectedFile} ) => {

    const selectFileRef = useRef<HTMLInputElement>(null);
    
    return (
        <Flex direction='column' justify='center' align='center' width='100%'>
            {selectedFile ? (
                <>
                    <Image src={selectedFile} maxWidth='400px' height='400px'/>
                    <Stack direction='row' mt={4}>
                        <Button 
                            height='28px' 
                            onClick={() => setSelectedTab("Post")}
                        >
                            Back to Post
                        </Button>
                        <Button 
                            variant='outline' 
                            height='28px'
                            onClick={() => setSelectedFile("")} 
                        >
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : (<Flex 
                    justify='center' 
                    align='center' 
                    p={20} 
                    border='1px dashed'
                    borderColor='gray.200'
                    width='100%'
                    borderRadius={4}
                >
                    <Button 
                        variant='outline' 
                        height='28px'
                        onClick={() => selectFileRef.current?.click()} 
                    >
                        Upload
                    </Button>
                    <input ref={selectFileRef} type='file' hidden onChange={onSelectedImage}/>
                    <img src={selectedFile}/>
                </Flex>)
            }
        </Flex>
    )
}
export default ImageUpload;