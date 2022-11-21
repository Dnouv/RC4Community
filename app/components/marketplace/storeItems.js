import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
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
                    
                    <NFTImage email={product.attributes.umail} id={product.attributes.id} />
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

const NFTImage = ({email, id}) => {
  const [callSpfQuery, {data, loading, error}] = getSpfUserDetails("")
  let pfpNFT = false
  const [nftPicURL, setNftPicURL] = useState()
  const [nftData, setNftData] = useState()
  const [nftDtlModal, setNftDtlModal] = useState(false)

  const handleNFTClick = async (e, pfpNFT) => {
    console.log("clicked", e.target, pfpNFT)
    if (pfpNFT) {
      try {
        const res = await fetchOpenSea(data.findUserByEmail.NFT.data[0].address, data.findUserByEmail.NFT.data[0].token)
        if (res?.image_url) {
          setNftData(res)
          setNftDtlModal(true)

        }
        
      } catch(e) {
        console.log("An error while fetching nft", e)
      }
    }
  }

  const onHide = () => {
    setNftDtlModal(false)
  }


  useEffect(() => {
    callSpfQuery(email)
    
  }, [])
  if(data) {
    if (data?.findUserByEmail?.NFT.data.length>0) {
      pfpNFT=true
      if (!nftPicURL) {
        const getNFTData = async () => {
          try {
            const res = await fetchOpenSea(data.findUserByEmail.NFT.data[0].address, data.findUserByEmail.NFT.data[0].token)
            if (res?.image_url) {
              setNftPicURL(res.image_url)
              // setNftData(res)

            }
            
          } catch(e) {
            console.log("An error while fetching nft", e)
          }
        }
        setTimeout(async () => {
          await getNFTData()

        }, 2000)
      }
    }
  }
  

  return (
    <>
    <span onClick={(e) => handleNFTClick(e, pfpNFT)} style={{cursor: "pointer"}} id={id}>
    <Image
      src={pfpNFT ? nftPicURL : "https://ui-avatars.com/api/?name=Seller"}
      width='50'
      id={id}
      height={50}
      roundedCircle={!pfpNFT}
      style={{clipPath: pfpNFT ? "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)": "none"}}
    />
    </span>
    <NftDetlModal show={nftDtlModal} onHide={onHide} ud={data} nftData={nftData} />
    </>
  )
}

const NftDetlModal = ({show, onHide, ud, nftData}) => {

  return(
  <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          NFT Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Container>
          <Row>
          <Col xs lg="2">
          <Image src={nftData?.image_url} fluid width={100} height={100} />
          </Col>
          <Col>
          <Row>
          <h4>{nftData?.name}</h4>
          <span style={{fontWeight: "300", fontSize: "smaller"}}>Collection: {nftData?.collection?.name}</span>
          <span style={{fontWeight: "300", fontSize: "smaller"}}>Owner: {ud?.findUserByEmail?.displayName}</span>
          </Row>
          </Col>
          </Row>
        </Container>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

      // src='https://i.seadn.io/gae/_JxArw1cGyJt17cQ5Eb02-BQ6Dk3hc5L_fipm3mfv9wP_uDNr8HlDtLyEy_JHVee04TwzwdPsUPEUCIZmbw2hF_K9y4M3P80lfsKcw'
