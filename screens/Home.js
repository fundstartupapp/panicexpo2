  {/* Manga Nova */}
  import React, {  useLayoutEffect } from "react";
    import { StatusBar } from 'expo-status-bar';
  import { useRef, useEffect, useState } from 'react';
  import { useFocusEffect } from '@react-navigation/native';
  import { Divider, Text } from 'react-native-paper';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { booksData } from './Data.js';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Button, Alert } from 'react-native';
import { Video } from 'expo-av';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}





const Home = ({ navigation }) => {

    const [userstatepro, setUserstatepro] = useState(false);
    
   

    const { 
        innerengineering,atomichabits,thinkandgrowrich,richdad,sevenhabits,
        a1,a2,a3,a4,a5,a6,
        b1,b2,b3,b4,b5,b6,
        
        onepiece, demonslayer, komisan, dragonballmultiverse,
         chainsawman,jibakushounen,bluelock,bananafish,
         recordofragnarok,goodnightpunpun,talesofdemonsandgods,
         jojosbizarreadventure, spyxfamily,Berserk, 
         blackclover,
         ijiranaidenagatorosan,
         pumpkinnight,jujutsukaisen,
         Mokushiroku,
         ShingekinoKyojin,
         sonobisque,
         vagabond,
         YofukashinoUta,
         Kaiju,yamada,OnePunchMan,myheroacademia,MushokuTensei,Mairimashita,hunterxhunter,bleach,Dandadan,drstone,
         kaguyasama,lavidadespues,Tsukigamichibiku,  } = booksData;

    const profileData = {
        name: 'Username',
        point: 200
    }

   

    
   
   
    const myBooksData = [
        {
            ...a1,
        },
        
        {
            ...a2,           
           
        },
        {
            ...a3,

        },
        {
            ...a4,

        },
        {
            ...a5,
        },
        
    ]

    const myBooksData2 = [
        {
            ...b1,
          
        },
        {
            ...b2,
        },
        {
            ...b3,
        },
        {
            ...b4,
        },
        {
            ...b5,
        },
        {
            ...b6,
        },
        
    ]
    const myBooksData3 = [
        {
            ...spyxfamily,
          
        },      
        {
            ...Berserk, 
        },
        {
            ...blackclover,
        },
        {
            ...ijiranaidenagatorosan,
        },
        {
            ...pumpkinnight,
        },
        
       
       
    ]
    

         

         const myBooksData4 = [
            {
                ...jujutsukaisen,
              
            },      
            {
                ...Mokushiroku,
            },
            {
                ...ShingekinoKyojin,
            },
            {
                ...sonobisque,
            },
            {
                ...vagabond,
            },
            
        ]
 

        const myBooksData5 = [
            {
                ...myheroacademia,
              
            },      
            {
                ...OnePunchMan,
            },
            {
                ...hunterxhunter,
            },
            {
                ...yamada,
            },
            {
                ...Mairimashita,
            },
            
        ]
         
        const myBooksData6 =  [
            {
                ...bleach,
              
            },      
            {
                ...Dandadan,
            },
            {
                ...drstone,
            },
            {
                ...kaguyasama,
            },
            {
                ...lavidadespues,
            },
            {
                ...Tsukigamichibiku,
            }
        ]

        const myBooksData7 =  [
            {
                ...jojosbizarreadventure
            },
           

            {
                ...Kaiju
            },
            {
                ...YofukashinoUta,
            },
            {
                ...MushokuTensei,
            },
            {
                ...Tsukigamichibiku,
            }
        ]


       
    const categoriesData = [
        {
            id: 1,
            categoryName: "Recommended by Us",
            books: [
                a1,b2,b5,a3
            ]
        },
       
    ]

    const [profile, setProfile] = React.useState(profileData);
    const [myBooks, setMyBooks] = React.useState(myBooksData);
    const [myBooks2, setMyBooks2] = React.useState(myBooksData2);
    const [myBooks3, setMyBooks3] = React.useState(myBooksData3);
    const [myBooks4, setMyBooks4] = React.useState(myBooksData4);
    const [myBooks5, setMyBooks5] = React.useState(myBooksData5);
    const [myBooks6, setMyBooks6] = React.useState(myBooksData6);
    const [myBooks7, setMyBooks7] = React.useState(myBooksData7);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);
    const secondVideo = React.useRef(null);   
    const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (isPlaying) {
          // Start video playback when the component mounts
          secondVideo.current?.playAsync();
        } else {
          // Pause video when it's not playing
          secondVideo.current?.pauseAsync();
        }
    
        // Return a cleanup function to pause the video when the component unmounts
        return () => {
          secondVideo.current?.pauseAsync();
        };
      }, [isPlaying]);
    
      // Use useFocusEffect to control video playback when the screen is focused and blurred
      useFocusEffect(
        React.useCallback(() => {
          // Start video playback when the screen is focused
          setIsPlaying(true);
    
          // Return a cleanup function to stop video playback when screen is unfocused
          return () => {
            setIsPlaying(false);
          };
        }, [])
      );
    

    function renderHeader(profile) {
        return (
            <View style={styles.container}>
            <Video
              ref={secondVideo}
              style={styles.video}
              source={require("../assets/App/nature.mp4")}
              useNativeControls={false}
              resizeMode="stretch"
              shouldPlay
              isLooping
              onPlaybackStatusUpdate={setStatusSecondVideo}
            />
            
          </View>
        )
    }

    

    function renderMyBookSection(myBooks, sectionTitle) {

        const renderItem = ({ item, index }) => {
            return (

               
            
               
               
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("BookDetail", {
                        book: item
                    })}
                >
                

                    {/* Book Cover scroll */}
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{
                            width: 215,
                            height: 200,
                            borderRadius: 20
                        }}
                    />

                    {/* Book Info */}
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                        
                       <AntDesign name="star" size={15} color="red" />
                        <Text style={{ ...FONTS.hf3, color: COLORS.black }}>{item.bookName}</Text>
                    {/*
                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.completion}</Text>
                        */}
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1  }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding,paddingVertical: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                
                <Text style={{ ...FONTS.h2, color: COLORS.black }}>{sectionTitle}</Text>
                
              
                    <TouchableOpacity
                        onPress={() => console.log("See More")}
                    >
                         {/* Header 
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>see more</Text>
                    */}
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function renderCategoryHeader() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ flex: 1, marginRight: SIZES.padding }}
                    onPress={() => setSelectedCategory(item.id)}
                >
                    {
                        selectedCategory == item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>{item.categoryName}</Text>
                    }
                    {
                        selectedCategory != item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{item.categoryName}</Text>
                    }
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
            </View>
        )
    }

    function renderCategoryData() {
        var books = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            books = selectedCategoryBooks[0].books
        }

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", {
                            book: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={item.bookCover}
                            resizeMode="cover"
                            style={{ width: 80, height: 120, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.hf3, color: COLORS.lightGray }}>{item.bookName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                            </View>

                            {/* Book Info */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Image
                                    source={icons.page_filled_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                            {/* Genre 
                                {
                                    item.genre.includes("Adventure") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Aventura</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Romance") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Drama") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                                    </View>
                                }
                                */}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
            {/* Header Section */}
            <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 300 }}>
                {renderHeader(profile)}
             
            </View>
            
            
            <ScrollView style={{ marginTop: SIZES.radius }}>
            <View style={{ height: 15 }}></View>
                <View>
                    {renderMyBookSection(myBooks, "Visualize")}
                </View>
                <View style={{ height: 20 }}></View>
                <View style={styles.container}>
                <Divider style={styles.halfDivider} />
                </View>
            
            <View style={{ height: 15 }}></View>
                <View>
                    {renderMyBookSection(myBooksData2, "Anxiety")}
                </View>
                <View style={{ height: 20 }}></View>
                <View style={styles.container}>
                <Divider style={styles.halfDivider} />
                </View>

              


                
                {/* Books Section 
                <View>
                    {renderMyBookSection(myBooks2,"Premium - Aventura")}
                </View>
                <View>
                    {renderMyBookSection(myBooks3,"Premium - Crimen")}
                </View>
                <View>
                    {renderMyBookSection(myBooks4,"Premium - Fantasía")}
                </View>
                <View>
                    {renderMyBookSection(myBooks5,"Premium - Divertido")}
                </View>
                <View>
                    {renderMyBookSection(myBooks6,"Premium - magia")}
                </View>
                <View>
                    {renderMyBookSection(myBooks7,"Premium - Love")}
                </View>
                
            */}

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    <View>
                        {renderCategoryHeader()}
                    </View>
                    <View>
                        {renderCategoryData()}
                    </View>
                </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      flex: 1,
      alignSelf: 'stretch',
      
    },
    halfDivider: {
        height: 1.5,
        backgroundColor: 'silver', 
        marginVertical: 5,// Adjust the height to control the size of the divider
         // Customize the color if needed
         // Adjust the vertical margin as needed
        width: '87%', // Set the width to 50% to make it half the size
      },
  });

export default Home;