/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { StoreContext } from "../StoreContext";
import moment from "moment";
import api_url from "../../src/utils/url";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

import styles from "./main.module.css";
import Link from "next/link";

export default function DashboardSettingsMain() {
  const router = useRouter();
  const { id } = router.query;

  const [Store] = useContext(StoreContext);

  const architectId = Store.architectId;
  const data = Store.architectData;

  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [specialized, setSpecialized] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setFname(data?.registered_id?.name ? data?.registered_id?.name : data.firstname + " " + data.lastname);
    setPhone(data?.registered_id?.phone ? data?.registered_id?.phone : data?.phone);
    setBio(data.bio);
    setCompany(data.companyName);
    setEmail(data?.registered_id?.email ? data?.registered_id?.email : data?.email);
    setLocation(data.location);
    setWebsite(data.website);
    setProfileImg(data?.profilepic ? data?.profilepic : "");
    setCoverImg(data?.coverpic ? data?.coverpic : "");
    setCreateDate(data.createdAt);
    setSpecialized(data?.specialized);
    setAddress(data?.address);
    setState(data?.state);
    setDistrict(data?.district);
    setCountry(data?.country);
  }, [data]);

  // console.log(data);

  const storeValues = () => {
    setBio(document.getElementById("bio").value);
    setCompany(document.getElementById("company").value);
    setLocation(document.getElementById("location").value);
    setWebsite(document.getElementById("web").value);
    setSpecialized(document.getElementById("specialized").value);
    setAddress(document.getElementById("address").value);
    setDistrict(document.getElementById("district").value);
    setState(document.getElementById("state").value);
    setCountry(document.getElementById("country").value);
  };

  /* Upload profile images */
  const [percent, setPercent] = useState(0);

  function handleUpload(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/architects/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setProfileImg(url);
        });
      }
    );
  }

  const handleImageChange = (event) => {
    console.log("onchange");
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      console.log(event.target.files[0]);
      /* setFile(event.target.files[0]); */
      handleUpload(event.target.files[0]);
    }
  };

  /* Upload Cover image */
  const [percentCover, setPercentCover] = useState(0);

  function handleUploadCover(img) {
    console.log("image uploading");
    if (!img) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/architects/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentCover(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);
          setCoverImg(url);
        });
      }
    );
  }

  const handleCoverImageChange = (event) => {
    console.log("onchange");
    if (!event.target.files[0]) {
      alert("Please choose a file first!");
    } else {
      console.log(event.target.files[0]);
      /* setFile(event.target.files[0]); */
      handleUploadCover(event.target.files[0]);
    }
  };

  async function updateArchitect() {
    var token = localStorage.getItem("architectToken");
    const res = await fetch(`${api_url}/architects/${architectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: fname,
        lastname: "",
        phone: phone,
        email: email,
        location: location,
        profilepic: profileImg,
        website: website,
        bio: bio,
        companyName: company,
        coverpic: coverImg,
        specialized: specialized,
        address: address,
        district: district,
        country: country,
        state: state,
      }),
    });
    const data = await res.json();
    if (data) {
      router.push(`/architect-dashboard/${architectId}`);
    }
  }

  const cancelClick = () => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.main_outer}>
        <div className={styles.sone_outer}>
          <div className={styles.sone_inner}>
            <div className={styles.title}>
              <div className={styles.field}>
                <div className={styles.main}>Profile information</div>
                <div className={styles.sub}>
                  Some information from this will be dispalyed to users, so be careful what you share
                </div>
              </div>
              <div className={styles.field}>
                <Link href={`/payment/${architectId}`} passHref>
                  <div className={styles.paymentBtn}>Add payment</div>
                </Link>
              </div>
            </div>
            <div className={styles.form_1}>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>Full name</span>
                  <input type="text" placeholder="Full name" value={fname} readOnly />
                </div>
                <div className={styles.field}>
                  <span>Website URL</span>
                  <input id="web" type="text" placeholder="Website URL" defaultValue={website} onChange={storeValues} />
                </div>
              </div>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>Specialized area</span>
                  <input
                    id="specialized"
                    type="text"
                    placeholder="Specialized area"
                    defaultValue={specialized}
                    onChange={storeValues}
                  />
                </div>
                <div className={styles.field}>
                  <span>Working/office location</span>
                  <input
                    id="location"
                    type="text"
                    placeholder="Working/office location"
                    defaultValue={location}
                    onChange={storeValues}
                  />
                </div>
              </div>
              <div className={styles.field_row_s}>
                <div className={styles.fullfield}>
                  <span>Company name</span>
                  <input
                    id="company"
                    type="text"
                    placeholder="Company name"
                    defaultValue={company}
                    onChange={storeValues}
                  />
                </div>
              </div>
              <div className={styles.fullfield}>
                <span>Tell something about yourself</span>
                <textarea id="bio" defaultValue={bio} onChange={storeValues}></textarea>
              </div>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>Profile photo</span>
                  <input
                    className={`${styles.profile_upload}`}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                  />
                  <div className={styles.upload_outer}>
                    <img
                      src={profileImg ? profileImg : "/img/architect-dashboard/photo-upload.svg"}
                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                      alt="profile_upload"
                    />
                    <div>Add photo</div>
                  </div>
                </div>
                <div className={styles.field}>
                  <span>Coverphoto</span>
                  <input
                    className={`${styles.cover_upload}`}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleCoverImageChange}
                  />
                  <div className={styles.upload_outer}>
                    <img
                      src={coverImg ? coverImg : "/img/architect-dashboard/photo-upload.svg"}
                      onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                      alt="profile_upload"
                    />
                    <div>Add photo</div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.title}>
              <div className={styles.main}>Personal information</div>
            </div>
            <div className={styles.form_2}>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>Email address</span>
                  <input type="text" placeholder="Email address" value={email} readOnly />
                </div>
                <div className={styles.field}>
                  <span>Phone number</span>
                  <input type="text" placeholder="Phone number" value={phone} readOnly />
                </div>
              </div>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>Personal address</span>
                  <input
                    id="address"
                    type="text"
                    placeholder="Personal address"
                    defaultValue={address}
                    onChange={storeValues}
                  />
                </div>
                <div className={styles.field}>
                  <span>District</span>
                  <input
                    id="district"
                    type="text"
                    placeholder="District"
                    defaultValue={district}
                    onChange={storeValues}
                  />
                </div>
              </div>
              <div className={styles.field_row}>
                <div className={styles.field}>
                  <span>State</span>
                  <input id="state" type="text" placeholder="State" defaultValue={state} onChange={storeValues} />
                </div>
                <div className={styles.field}>
                  <span>Country</span>
                  <input id="country" type="text" placeholder="Country" defaultValue={country} onChange={storeValues} />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={styles.footer}>
              <div className={styles.footer_text}>
                This account was craeted on {moment(createDate).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div>
                <div className={styles.Cancel} onClick={cancelClick}>
                  Cancel
                </div>
                <div className={styles.Save} onClick={updateArchitect}>
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
