import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
  Modal,
  OverlayTrigger,
  Spinner,
  Stack,
} from 'react-bootstrap';
import * as IPFS from 'ipfs-core';
import { useRef, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';
import Link from 'next/link';
import { uploadtoStrapi } from './uploadCMS';
import { fetchAPI } from '../../lib/api';
import { getUserMail } from './helper';

const IpfsAdder = ({ showText }) => {
  const [fileUrl, updateFileUrl] = useState(``);
  const [cid, setCID] = useState('');
  const [adding, setAdding] = useState(false);

  const hiddenInput = useRef(null);

  const addIPFS = async (e) => {
    try {
      setAdding(true);
      const file = e.target.files[0];

      const ipfs = await IPFS.create({ repo: 'ok' + Math.random() });

      console.log('ipfs', ipfs);
      const { cid } = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${cid.toString()}`;
      updateFileUrl(url);

      setCID(cid.toString());
      setAdding(false);
    } catch (e) {
      setAdding(false);
      console.error('An error occurred while uploading media', e);
    }
  };

  const handleInputClick = (event) => {
    hiddenInput.current.click();
  };

  return (
    <div className='mx-auto'>
      <Stack
        direction='vertical'
        gap={2}
      >
        <Stack
          direction='horizontal'
          gap={2}
        >
          <Button
            disabled={adding}
            onClick={handleInputClick}
          >
            {adding ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              showText
            )}
          </Button>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={hiddenInput}
            accept='image/*'
            capture='camera'
            onChange={addIPFS}
          />
          {!adding && cid && <Copy cid={cid} />}
        </Stack>

        {!adding && fileUrl &&  (
          <PreviewImage
            srcUrl={fileUrl}
            cid={cid.toString()}
          />
        )}
      </Stack>
    </div>
  );
};

const Copy = ({ cid }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(cid)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack
      gap={2}
      direction='horizontal'
    >
      <Button
        disabled
        variant='outline-dark'
      >
        {cid.substr(0, 5)}...{cid.substr(cid.length - 5, cid.length)}
      </Button>
      <Button
        variant='outline-dark'
        onClick={handleCopyClick}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </Button>
    </Stack>
  );
};

const PreviewImage = ({ srcUrl, cid }) => {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errMess, setErrMess] = useState(null);

  const [productDetails, setProductDetails] = useState({});

  const handleClose = () => {
    setShow(false)
    setAlertShow(false)
  };
  const handleShow = () => setShow(true);

  const strapiAdd = async (e) => {
    e.preventDefault()
    handleShow();
    try {
      const userMail = getUserMail()
      const productPayload = { ...productDetails, ['productCID']: cid, ['umail']: userMail };

      await uploadtoStrapi(productPayload);
      setAlertShow(true);
      setErrMess(null);
    } catch (e) {
      console.log('An error on IPFS', e);
      setAlertShow(true);
      setErrMess('An error occurred!');
    }
  };

  const handlePdForm = (e) => {
    e.preventDefault();
    const target = e.target.name;
    const value = e.target.value;
    setProductDetails({ ...productDetails, [target]: value });
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant='top'
        src={srcUrl}
      />
      <Card.Body>
        <Card.Title>Image Preview</Card.Title>
        <ButtonGroup>
          <Button
            href={srcUrl}
            target='_blank'
            variant='primary'
          >
            Visit on IPFS
          </Button>
          {/* <Link href={`store/${cid}`}  target="_blank"> */}
          <Button
            variant='success'
            onClick={handleShow}
          >
            <MdSell /> Sell
          </Button>
          {/* </Link> */}
        </ButtonGroup>
      </Card.Body>
      <ProductModal
        show={show}
        handleClose={handleClose}
        handlePdForm={handlePdForm}
        strapiAdd={strapiAdd}
        errMess={errMess}
        alertShow={alertShow}
      />
    </Card>
  );
};

const ProductModal = ({ show, alertShow, handleClose, handlePdForm, strapiAdd, errMess }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details Entry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={strapiAdd}>
            <Form.Group className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder="Evan's Phone"
                autoFocus
                required
                name='productName'
                onChange={handlePdForm}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                autoFocus
                required
                name='sellerEmail'
                onChange={handlePdForm}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Product Price (in $)</Form.Label>
              <Form.Control
                type='number'
                placeholder='1200'
                autoFocus
                min={0}
                required
                name='productPrice'
                onChange={handlePdForm}
              />
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                required
                name='productDescription'
                onChange={handlePdForm}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              style={{ float: 'right' }}
            >
              Publish Product
            </Button>
            {errMess ? (
              <Alert
                variant={'danger'}
                show={alertShow}
              >
                {errMess}
              </Alert>
            ) : (
              <Alert
                variant={'success'}
                show={alertShow}
              >
                Product successfully added to the Store
              </Alert>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IpfsAdder;
