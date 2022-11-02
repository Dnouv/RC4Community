import { Image } from "react-bootstrap"

export const IpfsDisplay = ({cid}) => {

    return (
        <div>
            The Product:
            <Image src={`https://ipfs.io/ipfs/${cid}`} fluid />
        </div>
    )
}