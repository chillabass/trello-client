import React from 'react';
import styled from 'styled-components';

interface FormItemProps {
  label: string,
  inputType: string,
  name: string,
};

export const FormItem: React.FC<FormItemProps> = ({ label, inputType, name }: FormItemProps) => {
return (
  <StyledFormItem>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput 
      name={name} 
      type={inputType}
    />
  </StyledFormItem>
)};

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  text-align: left;
  font-size: 16px;
  font-style: italic;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 5px;
  height: 37px;
  font-size: 18px;
  padding: 10px;
`;
