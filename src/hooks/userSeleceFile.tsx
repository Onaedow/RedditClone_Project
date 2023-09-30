import React, { useState } from 'react';

const userSeleceFile = () => {

    const [selectedFile, setSelectedFile] = useState<string>()

    // create images
    const onSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        // whether a valid file
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string)
            }
        }
    }
    
    return {
        selectedFile, setSelectedFile, onSelectedFile
    }
}
export default userSeleceFile;