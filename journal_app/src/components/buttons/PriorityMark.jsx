import styled from "styled-components";

const PriorityMark = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  margin: 10px;
  background-color: ${({ color }) => color};
  transform: rotate(45deg);
`;

export { PriorityMark };
