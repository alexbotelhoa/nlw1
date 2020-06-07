import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Dropzone {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Dropzone> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        onFileUploaded(file)

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />

            { selectedFileUrl 
                ? <img src={selectedFileUrl} alt="Ponto de coleta" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;