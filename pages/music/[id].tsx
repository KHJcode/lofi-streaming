import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/music-page.module.css";
import { useRouter } from "next/router";
import {FRONTEND_URL, thumbnailLink} from "../../constant/url";
import { Context } from "../../store";
// import axios from "axios";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import { findMusicById } from "../../service/music";
import Head from "next/head";

const Music: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { music, setMusic, setIsPlay } = useContext(Context) as any;

  useEffect(() => {
    if (id) {
      // const data = (await axios.get(`/api/music?id=${id}`))?.data;
      const data = findMusicById(id);
      if (data) {
        setMusic(data);
        setIsLoaded(true);
        setIsPlay(true);
      } else router?.push("/404");
    }
  }, [id]);

  const TITLE = `${music?.title} - KHJcode Lofi`;
  const URL = `${FRONTEND_URL}/music/${id}`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta property="og:title" content={TITLE} />
        <meta property="og:image" content={thumbnailLink(id)} />
        <meta property="og:url" content={URL} />

        <link rel="canonical" href={URL} />
      </Head>
      <Layout>
        <div className={styles.music_page_wrapper}>
          {isLoaded && (
            <div>
              <div
                className={styles.thumbnail}
                style={{ background: `url('${thumbnailLink(id as string)}')` }}
              >
                <div className={styles.dot}/>
              </div>
              <div className={styles.music_info_wrapper}>
                <div className={styles.title_wrapper}>
                  <h3 className={classNames(styles.title, "font-nunito")}>
                    {music.title}
                  </h3>
                </div>
                <div className={styles.author_wrapper}>
                  <h5 className={classNames(styles.author, "font-nunito")}>
                    {music.author}
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

export default Music;
