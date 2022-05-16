import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { TouchableOpacity } from 'react-native';
import { Box, Text, ScrollView } from 'native-base';

import MainHeader from '../../components/MainHeader/MainHeader';
import SpinnerFw from '../../components/SpinnerFw';

import { getDiseaseList } from '../../store/actions/diseases';
import propStyles from '../../resourses/propStyles';

const LiverDiseasePage = ({
  getDiseaseList,
  diseasesList,
  loadingDiseasesList,
  isLoadedData,
}) => {
  const navigation = useNavigation();
  const [diseases, setDiseases] = useState([]);
  const [termDiseas, setTermDiseas] = useState('');

  useEffect(() => {
    if (!isLoadedData) {
      getDiseaseList();
    }
  }, [getDiseaseList, isLoadedData]);

  useEffect(() => {
    setDiseases(diseasesList);
  }, [diseasesList]);

  useEffect(() => {
    termDiseas ? search(termDiseas) : setDiseases(diseasesList);
  }, [termDiseas]);

  if (loadingDiseasesList) {
    return <SpinnerFw />;
  }

  const search = (term) => {
    setDiseases(() =>
      diseasesList.map((el) => ({
        ...el,
        diseases: el.diseases.filter((dis) =>
          dis.title.toLowerCase().includes(term.toLowerCase())
        ),
      }))
    );
  };

  const onPushToLink = (id) => {
    navigation.navigate('ArticlePage', { id });
  };

  return (
    <Box flex={1}>
      <MainHeader
        isDiseas={true}
        termDiseas={termDiseas}
        setTermDiseas={setTermDiseas}
      />
      <ScrollView>
        <Box>
          {diseases.length
            ? diseases.map((el) => (
                <Box key={el.id}>
                  {el.diseases.length ? (
                    <Box px='16px' py='10px' bg='#f1f1f1'>
                      <Text color={propStyles.shadowColor}>{el.title}</Text>
                    </Box>
                  ) : null}
                  {el.diseases.map((dis, i) => (
                    <TouchableOpacity
                      onPress={() => onPushToLink(dis.id)}
                      style={{
                        backgroundColor: '#fff',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderBottomColor: propStyles.shadowedColor,
                        borderBottomWidth: el.diseases.length - 1 !== i ? 1 : 0,
                      }}
                      key={dis.id}
                    >
                      <Text color='#000'>{dis.title}</Text>
                    </TouchableOpacity>
                  ))}
                </Box>
              ))
            : null}
        </Box>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = ({
  diseases: { diseasesList, loadingDiseasesList },
  allData: { isLoadedData },
}) => {
  return { diseasesList, loadingDiseasesList, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiseaseList: () => dispatch(getDiseaseList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiverDiseasePage);
