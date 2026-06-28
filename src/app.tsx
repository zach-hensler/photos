import {useEffect, useState, useRef} from 'preact/hooks'
import {favorites, astro, cats, floral, metea, wildlife} from './imageCollections.ts'
import type {ImageMetadata} from './imageCollections.ts'
import './app.css'

type collections = 'Favorites' | 'Astro' | 'Cats' | 'Floral' | 'Metea' | 'Wildlife';

export function App() {
    const [collection, setCollection] = useState<collections>('Favorites')
    const [dialogImg, setDialogImg] = useState<string | null>();
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!dialogImg) {
            dialogRef.current?.close();
        } else {
            dialogRef.current?.showModal();
        }
    }, [dialogImg]);

    function Image(image: ImageMetadata) {
        function onClick() {
            setDialogImg(image.file);
        }

        return (
            <img key={image.file} class="image" onClick={onClick} src={"photos/" + image.file}/>
        )
    }

    function Dialog() {
        if (!dialogImg) {
            return <></>;
        }
        return (
            <dialog
                onClick={() => setDialogImg(null)}
                ref={dialogRef}>
                <img className="dialog-image" src={"photos/" + dialogImg}/>
            </dialog>
        )
    }

    function CollectionImages(): ImageMetadata[] {
        switch (collection) {
            case 'Favorites':
                return favorites;
            case 'Astro':
                return astro;
            case 'Cats':
                return cats;
            case 'Floral':
                return floral;
            case 'Metea':
                return metea;
            case 'Wildlife':
                return wildlife;
        }
    }

    return (
        <>
            <p className="subtitle">
                <span>Click to photos expand</span>
                <div>
                    <label htmlFor="collection">Collection: </label>
                    <select
                        id="collection"
                        onChange={(e) => setCollection(e.target.value)}>
                        <option value="Favorites">Favorites</option>
                        <option value="Metea">Metea</option>
                        <option value="Astro">Astro</option>
                        <option value="Cats">Cats</option>
                        <option value="Floral">Floral</option>
                        <option value="Wildlife">Wildlife</option>
                    </select>
                </div>
            </p>
            <div class="image-container">
                {CollectionImages().map(image => Image(image))}
            </div>
            <Dialog/>
        </>
    )
}