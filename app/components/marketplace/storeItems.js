import { Badge, Button, Card, Container, Image, Row } from 'react-bootstrap';
import { FaShare } from 'react-icons/fa';
import styles from '../../styles/ipfsStore.module.css';

export const ListStoreItems = ({ storeItems }) => {
  return (
    <Container>
      <Row className={styles.product_row}>
        {storeItems.data.map((product) => {
          return (
            <Card style={{ width: '18rem', marginBottom: '10px' }}>
              <Card.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span >
                    <span style={{ fontWeight: '500' }}>Price: </span>${product.attributes.productPrice}
                  </span>
                  <div>
                    <span style={{ fontWeight: '500' }}>Seller: </span>
                    <Image
                      src='https://i.seadn.io/gae/_JxArw1cGyJt17cQ5Eb02-BQ6Dk3hc5L_fipm3mfv9wP_uDNr8HlDtLyEy_JHVee04TwzwdPsUPEUCIZmbw2hF_K9y4M3P80lfsKcw'
                      roundedCircle
                      width='50'
                      height={50}
                    />
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
              <Button href={`mailto:${product.attributes.sellerEmail}`} variant='primary'>Contact</Button>
              <Button variant='success'><FaShare /></Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
};
