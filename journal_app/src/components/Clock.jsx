import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <Container>
      <div>{formatTime(time)}</div>
      <div>{formatDate(time)}</div>
    </Container>
  );
};

const Container = styled.div`
  color: var(--lightGray);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & :first-child {
    color: var(--yellow);
    font-weight: bolder;
    font-size: 20px;
  }
  & :nth-child(2) {
    margin-top: 2px;
    font-size: 14px;
  }
`;

export default Clock;
