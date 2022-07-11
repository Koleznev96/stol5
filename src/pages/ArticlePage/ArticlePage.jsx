import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Linking, Dimensions, Platform } from 'react-native';
import { Box, Center, Text } from 'native-base';

import SpinnerFw from '../../components/SpinnerFw';

import { getCurArticle, updateCurArticle } from '../../store/actions/article';
import MainHeader from '../../components/MainHeader/MainHeader';

import { imgPath } from '../../resourses/variables';
import { WebView } from 'react-native-webview';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ArticlePage = ({
  curArticle,
  loadingCurArticle,
  getCurArticle,
  route,
  allDataArticles,
  isLoadedData,
  updateCurArticle,
}) => {
  const { id } = route.params;

  useEffect(() => {
    if (!isLoadedData && id) {
      getCurArticle(id);
    } else if (isLoadedData && id) {
      updateCurArticle(allDataArticles.filter((el) => +el.id === +id)[0]);
    }
  }, [id, getCurArticle]);

  if (loadingCurArticle) {
    return <SpinnerFw />;
  }

  const test = () => {
    // console.log('curArticle?.content', curArticle?.content);
  };

  // console.log('7777-', curArticle.content.replace(/src="/g, `src="${imgPath}`).replace('https://vseopecheni.ru/https://www.youtube.com/', `https://www.youtube.com/`))
  // console.log('7777-', curArticle.content)

  return (
    <>
      {curArticle?.content ? (
        <>
          <MainHeader />
          {/* <Button mt={5} onPress={test}>
            123112
          </Button> */}
          {/* <ScrollView style={{width: '100%'}}> */}
          {/* <Box style={{width: '100%', paddingLeft: 12, paddingRight: 12, marginTop: 5,}}>
          <MaskedView
          style={{ height: 30, width: width - 28, }}
          maskElement={
            <Text
              w={width - 40}
              fontSize={18}
              fontWeight='500'
              color='red'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {curArticle.title}
            </Text>
          }
        >
          <LinearGradient
            // start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.33 }}
            colors={['#F84784', '#7348FF']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        </Box> */}

          <WebView
            onShouldStartLoadWithRequest={(event) => {
              console.log('nnn-', event.url);
              const isExternalLink =
                Platform.OS === 'ios' ? event.navigationType === 'click' : true;
                console.log('nnn-', event.url)
              if (event.url.slice(0, 4) === 'http' && isExternalLink) {
                Linking.canOpenURL(event.url).then(supported => {
                  if (supported) {
                    Linking.openURL(event.url);
                  }
                });
                return false;
              } else if (event.url.slice(0, 11) !== 'about:blank' && isExternalLink && event.url.slice(0, 23) !== 'https://www.youtube.com') {
                Linking.canOpenURL('https://vseopecheni.ru' + event.url).then(supported => {
                  if (supported) {
                    Linking.openURL('https://vseopecheni.ru' + event.url);
                  }
                });
              }
              return true;

              // console.log('==', event)
              // if (!event.url.startsWith('httpы')) {
              //   Linking.openURL(event.url)
              //   return false
              // }
              // return true

              // console.log('==', event)
              // if (event.url.slice(0, 4) === 'http') {
              //   if (event.url.slice(0, 26) !== 'http://vseopecheni.ru/http' && event.url.slice(0, 27) !== 'https://vseopecheni.ru/http') {
              //     console.log('+++', event.url.slice(0, 27));
              //     Linking.openURL(event.url);
              //     return false;
              //   }
              // } else {
              //   if (event.url !== 'about:blank') {
              //     console.log('000')
              //     Linking.openURL('https://vseopecheni.ru' + event.url);
              //     return false;
              //     // 'https://vseopecheni.ru/https:/www.youtube.com/embed/sryfzpkf_r8'
              //   }
              // }
              // console.log('---');
              // return true;
            }}
            style={{ margin: 2 }}
            originWhitelist={['*']}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
                <body>
                  ${curArticle.content.replace(/src="/g, `src="${imgPath}`).replace('https://vseopecheni.ru/https://www.youtube.com/', `https://www.youtube.com/`)}
                </body>
              </html>`,
            }}
          />
          {/* </ScrollView> */}
        </>
        
      ) : (
        <Box flex={1}>
          <MainHeader />
          <Center mt='20%' _text={{ fontSize: 20, fontWeight: '500' }}>
            Ничего не найдено
          </Center>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = ({
  article: { curArticle, loadingCurArticle },
  allData: { allDataArticles, isLoadedData },
}) => {
  return { curArticle, loadingCurArticle, allDataArticles, isLoadedData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurArticle: (id) => dispatch(getCurArticle(id)),
    updateCurArticle: (data) => dispatch(updateCurArticle(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
