import styled from "styled-components";

export const SearchBox = styled.div`
position:fixed;
top: 0;
left: 0;
right: 0;
width: 100%;
height: 6rem;
display: flex;
align-items: center;
background-color: #0AB38A;
padding-left: 2.7%;
box-sizing: border-box;
z-index: 1;

input { 
  width: 80%;
  height: 32px;
  left: 11px;
  top: 18px;
  background: #FFFFFF;
  border-radius: 8px;
}

.menu-container {
  width: 5%;
}

input::placeholder{
  padding-left: 40px;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: 350;
  font-size: 18px;
  line-height: 24px;
}
`