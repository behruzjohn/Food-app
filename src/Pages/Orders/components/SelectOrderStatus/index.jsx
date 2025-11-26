import { InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledSelectWrapper } from './StyleOrderStatus';

function SelectOrderStatus({ status, setStatus }) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <StyledSelectWrapper className="l" size="small" variant="outlined">
      <InputLabel id="select-label">{t('status')}</InputLabel>

      <Select
        className="select"
        labelId="select-label"
        value={status}
        onChange={handleChange}
        label={t('status')}
      >
        <MenuItem value={null}>{t('all')}</MenuItem>
        <MenuItem value={'pending'}>{t('pending')}</MenuItem>
        <MenuItem value={'cooking'}>{t('cooking')}</MenuItem>
        <MenuItem value={'delivering'}>{t('deleviring')}</MenuItem>
        <MenuItem value={'received'}>{t('received')}</MenuItem>
      </Select>
    </StyledSelectWrapper>
  );
}

export default SelectOrderStatus;
