import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function SelectOrderStatus({ status, setStatus }) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <FormControl style={{ width: 130 }}>
      <InputLabel id="demo-simple-select-label">{t('status')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={'all'}>{t('all')}</MenuItem>
        <MenuItem value={'pending'}>{t('pending')}</MenuItem>
        <MenuItem value={'cooking'}>{t('cooking')}</MenuItem>
        <MenuItem value={'delivering'}>{t('deleviring')}</MenuItem>
        <MenuItem value={'received'}>{t('received')}</MenuItem>
      </Select>
    </FormControl>
  );
}
export default SelectOrderStatus;
