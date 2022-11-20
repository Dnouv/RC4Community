import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { fetchOpenSea } from "../../../../lib/walletAPI";

const createDummyUser = () => {
  return {
    id: 1,
    name: "dummy.cat",
    image:
      "https://user-images.githubusercontent.com/25859075/29918905-88dcc646-8e5c-11e7-81ec-242bc58dce1b.jpg",
    email: "dummyuser@rocket.chat",
    emailVerified: false,
    phoneNumber: null,
    displayName: "dummy.cat",
  };
};

export const useDummyAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const isStoredInSession = JSON.parse(sessionStorage.getItem("dummy_user"));
    if (isStoredInSession) {
      setUser(isStoredInSession);
    }
  }, []);

  const handleLogin = () => {
    const dummy_user = createDummyUser();
    setUser(dummy_user);
    sessionStorage.setItem("dummy_user", JSON.stringify(dummy_user));
    Cookies.set("user", dummy_user.id)
  };
  
  const handleLogout = () => {
    setUser({});
    sessionStorage.removeItem("dummy_user");
    Cookies.remove("user")
  };

  const handleProfileUpdate = async () => {
    const dummy_user = createDummyUser();
    const nftData = sessionStorage.getItem("nft_profile")
    let address = null
    let token = null
    let userImg = null
    if(nftData) {
      const parsed = JSON.parse(nftData)
      address = parsed.address
      token = parsed.token

      const nftAsset = await fetchOpenSea(address, token)
      userImg = nftAsset.image_url
    }

    dummy_user['address'] = address
    dummy_user['token'] = token
    dummy_user['pfpNFT'] = true
    dummy_user['image'] = userImg
    setUser(dummy_user);
    sessionStorage.setItem("dummy_user", JSON.stringify(dummy_user))
  }

  return {
    user,
    handleLogin,
    handleLogout,
    handleProfileUpdate
  };
};
