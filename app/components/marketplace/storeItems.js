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


  useEffect(() => {
    callSpfQuery(email)
    
  }, [])
  if(data) {
    if (data?.findUserByEmail?.NFT.data.length>0) {
      pfpNFT=true
    }
  }
  

  return (
    <span onClick={() => console.log("clieck em")} style={{cursor: "pointer"}}>
    <Image
      src='https://i.seadn.io/gae/_JxArw1cGyJt17cQ5Eb02-BQ6Dk3hc5L_fipm3mfv9wP_uDNr8HlDtLyEy_JHVee04TwzwdPsUPEUCIZmbw2hF_K9y4M3P80lfsKcw'
      width='50'
      height={50}
      roundedCircle={!pfpNFT}
      style={{clipPath: pfpNFT ? "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)": "none"}}
    />
    </span>
  )
}
