import { getStrapiURL } from "../../lib/api"

export const uploadtoStrapi = async (productDetails) => {
    // const schemaObject = {
    //     "data": {
    //       "productName": "Frame",
    //       "productDescription": "Meet Delmi, a fully-featured UI Design kit for E-commerce, including exclusive design files and a linked component library in Figma.",
    //       "productPrice": "1200",
    //       "sellerEmail": "admin@rocket.cat",
    //       "productCID": "QmfTY7WZeg5bFTHYAYZMbfCkkqMRMeb269xakFYixcwaaG"
    //     }
    //   }
    const schemaObject = {
      "data": productDetails
    }

      const strapiUrl = getStrapiURL("/web3stores")

      const callStrapi = await fetch(strapiUrl, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(schemaObject),
        headers: {
            'Content-Type': 'application/json'
        },
      })
      console.log("return after fetch", callStrapi)
      
}