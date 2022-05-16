import React from 'react';

import { Popover, Center, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

const PopoverDatePicker = ({
  button,
  value,
  setValue,
  takeDate,
  showBtn,
  isReceptionsFood,
}) => {
  return (
    <Popover
      trigger={(triggerProps) => {
        return button(triggerProps);
      }}
    >
      <Popover.Content width={250} borderRadius={'xl'}>
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Body>
          {isReceptionsFood && <Center>Первый прием пищи</Center>}
          <DateTimePicker
            testID='dateTimePicker'
            value={value ? value : new Date()}
            mode={'time'}
            is24Hour={true}
            display='spinner'
            onChange={(_, selectedDate) => setValue(selectedDate)}
          />
        </Popover.Body>
        <Popover.Footer style={{ alignItems: 'center' }}>
          {showBtn && (
            <Center w='100%'>
              <Button onPress={takeDate} bg='#fff' color='#000'>
                Выбрать
              </Button>
            </Center>
          )}
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
};

export default PopoverDatePicker;
