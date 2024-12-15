'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css'

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlerPickerClick() {
        imageInput.current.click();
    }

    function handlerImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor='image'></label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='Preview' fill />}
                </div>
                <input className={classes.input} type='file' id={name} name={name} accept='image/png, image/jpeg' ref={imageInput} required onChange={handlerImageChange} />
                <button className={classes.button} type='button' onClick={handlerPickerClick}>Pick an Image</button>
            </div>
        </div>
    )
}