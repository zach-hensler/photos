import { useEffect, useState, useRef } from 'preact/hooks'
import {imageIndex} from './imageIndex.ts'
import type { ImageMetadata } from './imageIndex.ts'
import './app.css'

export function App() {
  const [dialogImg, setDialogImg] = useState<string|null>();
  const dialogRef = useRef<HTMLDialogElement|null>(null);

    useEffect(() => {
        if (!dialogImg) {
            dialogRef.current?.close();
        }
        else {
            dialogRef.current?.showModal();
        }
    }, [dialogImg]);

  function Image(image: ImageMetadata) {
    function onClick() {
        setDialogImg(image.file);
    }
    return (
        <img class="image" onClick={onClick} src={"photos/"+image.file} />
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

  return (
    <>
        <div class="image-container">
            {imageIndex.map(image => Image(image))}
        </div>
        <Dialog />
    </>
  )
}