import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { FaShare } from 'react-icons/fa';
import styles from '../../styles/ipfsStore.module.css';
import { getSpfUserDetails } from './helper';
import {fetchOpenSea} from "../../lib/walletAPI"

export const ListStoreItems = ({ storeItems }) => {

  const renderTooltip = (props) => (
    <Tooltip
      id='button-tooltip'
      {...props}
    >
      Share
    </Tooltip>
  );

  return (
    <Container>
      <Row className={styles.product_row}>
        {storeItems.data.map((product) => {
          return (
            <Card style={{ width: '18rem', marginBottom: '10px' }}>
              <Card.Header>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span>
                    <span style={{ fontWeight: '500' }}>Price: </span>$
                    {product.attributes.productPrice}
                  </span>
                  <div>
                    <span style={{ fontWeight: '500' }}>Seller: </span>
                    
                    <NFTImage email={product.attributes.umail} />
                  </div>
                </div>
              </Card.Header>

              <Card.Img
                variant='top'
                src={`https://ipfs.io/ipfs/${product.attributes.productCID}`}
              />
              <Card.Body>
                <Card.Title>{product.attributes.productName}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the
                  card's content.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  href={`mailto:${product.attributes.sellerEmail}`}
                  variant='primary'
                >
                  Contact
                </Button>
                <OverlayTrigger
                  placement='right'
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button variant='success'>
                    <FaShare />
                  </Button>
                </OverlayTrigger>
              </Card.Footer>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};

const NFTImage = ({email}) => {
  const [callSpfQuery, {data, loading, error}] = getSpfUserDetails("")
  let pfpNFT = false
  const [st, setSt] = useState()


  useEffect(() => {
    callSpfQuery(email)
    
  }, [])
  if(data) {
    if (data?.findUserByEmail?.NFT.data.length>0) {
      pfpNFT=true
      if (!st) {
        const getNFTData = async () => {
          try {
            const res = await fetchOpenSea(data.findUserByEmail.NFT.data[0].address, data.findUserByEmail.NFT.data[0].token)
            if (res?.image_url) {
              setSt(res.image_url)
            }
          } catch(e) {
            console.log("An error while fetching nft", e)
          }
        }
        getNFTData()
      }
    }
  }
  

  return (
    <span onClick={() => console.log("clieck em", st)} style={{cursor: "pointer"}}>
    <Image
      src={pfpNFT ? st : "https://ui-avatars.com/api/?name=Seller"}
      width='50'
      height={50}
      roundedCircle={!pfpNFT}
      style={{clipPath: pfpNFT ? "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)": "none"}}
    />
    </span>
  )
}

      // src='https://i.seadn.io/gae/_JxArw1cGyJt17cQ5Eb02-BQ6Dk3hc5L_fipm3mfv9wP_uDNr8HlDtLyEy_JHVee04TwzwdPsUPEUCIZmbw2hF_K9y4M3P80lfsKcw'
