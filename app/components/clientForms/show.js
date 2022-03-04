import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../../styles/form.module.css";

function RCform({ formFields }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData([...formData, ...formFields]);
  }, [formFields]);

  return formData.map((form, ind) => (
    <Card key={"indiForm" + ind} className={styles.showCard}>
      <Card.Title className={styles.showTitle}>{form.title}</Card.Title>
      <Card.Body>
        <Form>
          {form.formQs.map((ele, i) => (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{ele.value}</Form.Label>
              {ele.type == "number" ? (
                <>
                  <Form.Control
                    key={i}
                    type={ele.type}
                    min={ele.min}
                    max={ele.max}
                    placeholder=""
                    required={ele.required}
                  />
                  <Form.Text className="text-muted">
                    * Value must be in range {ele.min} - {ele.max}
                  </Form.Text>
                </>
              ) : (
                <Form.Control
                  key={i}
                  type={ele.type}
                  placeholder=""
                  required={ele.required}
                />
              )}

              {ele.type == "number"}
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  ));
}

export default RCform;
