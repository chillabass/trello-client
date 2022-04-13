import { ErrorMessage, Field, Form } from "formik";
import styled from "styled-components";

export const StyledSignup = styled.div`
  background-color: #0069a5;
  text-align: center;
  color: #eee;
  font-size: 35px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitle = styled.h1`
  font-size: 50px;
`;

// export const StyledForm = styled.form`
//   background-color: #ebecf0;
//   color: #1b1b1b;
//   font-size: 15px;
//   width: 400px;
//   height: fit-content;
//   border-radius: 10px;
//   padding: 10px 15px;
// `;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
  color: #1b1b1b;
  font-size: 15px;
  width: 400px;
  height: fit-content;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 25px 0;
`;

export const StyledField = styled(Field)`
  border: none;
  border-radius: 5px;
  height: 37px;
  font-size: 18px;
  padding: 25px;
  margin: 10px 5px;
  transition: .05s;

  &:focus {
    outline: 2px solid #0b77db ;
  }
`;

export const StyledErrorMessage = styled.div`
  color: #c40202;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  width: 88%;
  margin: 10px;
  color: #eef;
  background-color: #ff9926;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: .2s;
  font-weight: bold;
  align-self: center;
  cursor: pointer;

  &:hover {
    background-color: #f88400;
  }
`;