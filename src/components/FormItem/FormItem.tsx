import React from 'react';
import { StyledFormItem, StyledInput, StyledLabel } from './FormItem.styles';

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
  )
};
