/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./UsersList.module.css";
import moment from "moment";
import endpoint from "../../src/utils/endpoint";

const UsersList = () => {
  const [userList, setUserList] = useState([]);

  async function getAllUsers() {
    const res = await fetch(`${endpoint}/user/userlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={styles.userList}>
      <h3>Users List</h3>
      <div className={styles.userList_container}>
        <div className={styles.title_userList_container}>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
            {userList?.map((item, index) => {
              return (
                <>
                  {item?.role === "user" ? (
                    <tr key={index}>
                      <td>
                        <div className={styles.profileTable}>
                          <img
                            className={styles.avatar}
                            src={
                              item?.profile_pic
                                ? item?.profile_pic
                                : "https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png"
                            }
                            onError={(e) => (e.target.src = "/img/landing/profile_img.svg")}
                            alt=""
                          />
                          <h4 className={styles.nameTable}>{item?.name}</h4>
                        </div>
                      </td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{moment(item?.createdAt).format("lll")}</td>
                      <td>{moment(item?.updatedAt).format("lll")}</td>
                    </tr>
                  ) : (
                    " "
                  )}
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
