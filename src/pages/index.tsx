import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (
  serverTime: Date,
  clientTime: Date
): string => {
  const timeDiff = Math.abs(serverTime.getTime() - clientTime.getTime());

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home() {
  const router = useRouter();
  const [serverTime, setServerTime] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState("");

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch("/api/time");
        if (response.ok) {
          const data = await response.json();
          setServerTime(new Date(data.serverTime));
        }
      } catch (error) {
        console.error("Failed to get server time:", error);
      }
    };
    fetchServerTime();
  }, []);

  useEffect(() => {
    const clientTime = new Date();
    const difference = calculateTimeDifference(serverTime, clientTime);
    setTimeDifference(difference);
  }, [serverTime]);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">
              {serverTime.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff: <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
