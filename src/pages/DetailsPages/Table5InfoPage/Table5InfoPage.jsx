import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Box, Flex, Text, Image, ScrollView } from 'native-base';
import MainHeader from '../../../components/MainHeader/MainHeader';

import SpinnerFw from '../../../components/SpinnerFw';

import { imgPath } from '../../../resourses/variables';
import {
  getTable5InfoById,
  updateTable5InfoById,
} from '../../../store/actions/table5';
import propStyles from '../../../resourses/propStyles';

const InfoItem = ({ text }) => {
  return (
    <Box mb={4}>
      <Text fontSize={18}>
        {'\u2022'} {text}
      </Text>
    </Box>
  );
};

const LableItem = ({ icon, text, color, isLoadedData }) => {
  return (
    <Flex flex={1} direction='row' align='center'>
      <Box mr={3}>
        <Image
          width={50}
          height={50}
          alt={text || 'Product image'}
          source={{ uri: isLoadedData ? icon : imgPath + icon }}
        />
      </Box>
      <Box>
        <Text fontSize={20} fontWeight='500' color={color}>
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

const Table5InfoPage = ({
  route,
  getTable5InfoById,
  table5Info,
  loadingTable5Info,
  allDataCanEatList,
  isLoadedData,
  updateTable5InfoById,
}) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(isLoadedData ? true : false);

  useEffect(() => {
    if (!isLoadedData && id) {
      getTable5InfoById(id);
    } else if (isLoadedData && id) {
      updateTable5InfoById(allDataCanEatList.filter((el) => el.id == id)[0]);
    }
    setLoading(false);
  }, [id]);

  if (loading || loadingTable5Info) {
    return <SpinnerFw />;
  }

  return (
    <Box flex={1}>
      <MainHeader />
      <ScrollView>
        <Box p='14px'>
          <Box>
            {table5Info?.allowed?.length ? (
              <>
                <LableItem
                  isLoadedData={isLoadedData}
                  icon={table5Info.icon_allowed}
                  text={'МОЖНО'}
                  color={propStyles.successColor}
                />
                <Box mt={'30px'}>
                  {table5Info.allowed.map((text, i) => (
                    <InfoItem key={i} text={text} />
                  ))}
                </Box>
              </>
            ) : null}
          </Box>
          <Box>
            {table5Info?.forbidden?.length ? (
              <>
                <LableItem
                  isLoadedData={isLoadedData}
                  icon={table5Info.icon_forbidden}
                  text={'НЕЛЬЗЯ'}
                  color={'#DA3883'}
                />
                <Box mt={'30px'}>
                  {table5Info.forbidden.map((text, i) => (
                    <InfoItem key={i} text={text} />
                  ))}
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  table5: { table5Info, loadingTable5Info },
  allData: { allDataCanEatList, isLoadedData },
}) => {
  return { table5Info, loadingTable5Info, allDataCanEatList, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTable5InfoById: (id) => dispatch(getTable5InfoById(id)),
    updateTable5InfoById: (data) => dispatch(updateTable5InfoById(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table5InfoPage);
