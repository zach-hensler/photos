import {useEffect, useState, useRef} from 'preact/hooks'
import {favorites, astro, cats, colorado_springs, floral, manistee_river, metea, wildlife} from './imageCollections.ts'
import type {ImageMetadata} from './imageCollections.ts'
import './app.css'

type collections = 'Favorites' | 'Astro' | 'Cats' | 'Colorado Springs' | 'Floral' | 'Manistee River' | 'Metea' | 'Wildlife';

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
            case 'Colorado Springs':
                return colorado_springs;
            case 'Floral':
                return floral;
            case 'Manistee River':
                return manistee_river;
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
                        <option value="Astro">Astro</option>
                        <option value="Cats">Cats</option>
                        <option value="Colorado Springs">Colorado Springs</option>
                        <option value="Floral">Floral</option>
                        <option value="Manistee River">Manistee River</option>
                        <option value="Metea">Metea</option>
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